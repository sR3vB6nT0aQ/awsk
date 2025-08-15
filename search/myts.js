import axios from 'axios';
import https from 'https';

// Headers actualizados para YouTube Music 2024
const musicHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/json',
    'X-Goog-Request-Time': Date.now().toString(),
    'X-Goog-Visitor-Id': 'CgtwMUtfdWpTUTdwSSiA3Z2tBdw%3D%3D',
    'X-Youtube-Client-Name': '67',
    'X-Youtube-Client-Version': '1.20240814.01.00'
};

// Función mejorada para extraer datos usando el API interno
async function extractMusicDataAPI(query) {
    try {
        const searchUrl = 'https://music.youtube.com/youtubei/v1/search';
        
        const payload = {
            context: {
                client: {
                    clientName: "WEB_REMIX",
                    clientVersion: "1.20240814.01.00",
                    hl: "en",
                    gl: "US",
                    experimentIds: [],
                    experimentsToken: "",
                    utcOffsetMinutes: 0,
                    userAgent: musicHeaders['User-Agent'],
                    screenDensityFloat: 1,
                    screenScaleFactor: 1
                },
                user: {
                    enableSafetyMode: false
                }
            },
            query: query,
            params: "Eg-KAQwIARAAGAAgACgAMABqChAKEAOAAtgDAQgCKgsIABCABBiiAxgAmgUBMAAQ"
        };

        const response = await axios.post(searchUrl, payload, {
            headers: {
                ...musicHeaders,
                'Origin': 'https://music.youtube.com',
                'Referer': 'https://music.youtube.com/'
            },
            timeout: 15000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        return response.data;
    } catch (error) {
        throw new Error(`API error: ${error.message}`);
    }
}

// Función mejorada para parsear resultados
function parseMusicResults(data) {
    const results = [];
    
    try {
        const tabs = data.contents?.tabbedSearchResultsRenderer?.tabs || 
                    data.contents?.sectionListRenderer?.contents || [];
        
        // Buscar en diferentes estructuras posibles
        let items = [];
        
        // Buscar en musicShelfRenderer
        for (const tab of tabs) {
            const sections = tab.tabRenderer?.content?.sectionListRenderer?.contents || 
                           [tab];
            
            for (const section of sections) {
                const shelfItems = section.musicShelfRenderer?.contents || 
                                 section.musicCardShelfRenderer?.contents || [];
                items.push(...shelfItems);
            }
        }
        
        // Si no encontramos en la estructura anterior, buscar directamente
        if (items.length === 0) {
            items = data.contents?.sectionListRenderer?.contents?.[0]?.musicShelfRenderer?.contents || [];
        }

        for (const item of items) {
            const track = item.musicResponsiveListItemRenderer || 
                         item.musicTwoRowItemRenderer;
            
            if (!track) continue;

            // Extraer información del track
            let videoId = '';
            let title = '';
            let artists = [];
            let album = '';
            let duration = '';
            let thumbnail = '';
            let type = 'song';

            if (track.navigationEndpoint?.watchEndpoint?.videoId) {
                videoId = track.navigationEndpoint.watchEndpoint.videoId;
            } else if (track.navigationEndpoint?.browseEndpoint?.browseId) {
                // Podría ser un álbum o artista
                continue;
            }

            // Extraer título
            if (track.flexColumns) {
                const titleColumn = track.flexColumns[0]?.musicResponsiveListItemFlexColumnRenderer;
                title = titleColumn?.text?.runs?.[0]?.text || '';
            } else if (track.title) {
                title = track.title?.runs?.[0]?.text || '';
            }

            // Extraer artistas
            if (track.flexColumns && track.flexColumns[1]) {
                const artistColumn = track.flexColumns[1]?.musicResponsiveListItemFlexColumnRenderer;
                artists = artistColumn?.text?.runs
                    ?.filter(run => run.navigationEndpoint?.browseEndpoint?.browseId?.startsWith('UC'))
                    .map(run => run.text) || [];
            }

            // Extraer duración
            if (track.fixedColumns) {
                duration = track.fixedColumns[0]?.musicResponsiveListItemFixedColumnRenderer?.text?.runs?.[0]?.text || '';
            } else if (track.lengthText) {
                duration = track.lengthText?.runs?.[0]?.text || '';
            }

            // Extraer thumbnail
            const thumbnails = track.thumbnail?.musicThumbnailRenderer?.thumbnail?.thumbnails || 
                             track.thumbnailRenderer?.musicThumbnailRenderer?.thumbnail?.thumbnails || [];
            thumbnail = thumbnails[thumbnails.length - 1]?.url || '';

            if (videoId && title) {
                results.push({
                    videoId: videoId,
                    title: title,
                    artists: artists,
                    album: album,
                    duration: duration,
                    durationSeconds: parseDuration(duration),
                    thumbnail: thumbnail,
                    url: `https://music.youtube.com/watch?v=${videoId}`,
                    type: type
                });
            }
        }

    } catch (error) {
        console.error('Error parsing music results:', error);
    }

    return results;
}

// Función base mejorada
async function searchYouTubeMusic(query, limit = 1) {
    try {
        let results = [];
        
        // Intentar primero con el API
        try {
            const data = await extractMusicDataAPI(query);
            results = parseMusicResults(data);
        } catch (apiError) {
            console.log('API failed, trying web scraping...');
            // Fallback a scraping web tradicional
            const searchUrl = `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
            
            const response = await axios.get(searchUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Origin': 'https://music.youtube.com',
                    'Referer': 'https://music.youtube.com/'
                },
                timeout: 10000,
                httpsAgent: new https.Agent({ rejectUnauthorized: false })
            });

            // Buscar ytInitialData en el HTML
            const match = response.data.match(/var ytInitialData = ({.+?});/s) || 
                         response.data.match(/window\["ytInitialData"\] = ({.+?});/s);
            
            if (match) {
                const data = JSON.parse(match[1]);
                results = parseMusicResults(data);
            } else {
                throw new Error('No se pudo encontrar ytInitialData');
            }
        }

        const limitedResults = limit ? results.slice(0, limit) : results;

        return {
            autor: '🜲 ᵖᵃᵗᵒ',
            status: true,
            data: limit === 1 ? limitedResults[0] || null : limitedResults
        };

    } catch (error) {
        console.error('Error en YouTube Music search:', error.message);
        return {
            autor: '🜲 ᵖᵃᵗᵒ',
            status: false,
            data: limit === 1 ? null : []
        };
    }
}

// Función auxiliar para parsear duración (sin cambios)
function parseDuration(durationText) {
    if (!durationText) return 0;
    const parts = durationText.split(':').map(Number);
    return parts.length === 3 
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];
}

// Función de búsqueda simple (1 resultado)
export async function ytmSearch(query) {
    return await searchYouTubeMusic(query, 1);
}

// Función de búsqueda completa (todos los resultados)
export async function fytmSearch(query) {
    return await searchYouTubeMusic(query, null);
}

// Función mejorada para obtener metadatos extendidos
export async function ytmMetadata(videoId) {
    try {
        const url = `https://music.youtube.com/youtubei/v1/next`;
        
        const payload = {
            context: {
                client: {
                    clientName: "WEB_REMIX",
                    clientVersion: "1.20240814.01.00",
                    hl: "en",
                    gl: "US"
                }
            },
            videoId: videoId
        };

        const response = await axios.post(url, payload, {
            headers: {
                ...musicHeaders,
                'Origin': 'https://music.youtube.com',
                'Referer': `https://music.youtube.com/watch?v=${videoId}`
            },
            timeout: 10000,
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        const data = response.data;
        
        // Extraer información básica
        const currentVideo = data.currentVideoEndpoint?.watchEndpoint;
        const playerOverlay = data.playerOverlays?.playerOverlayRenderer;
        const videoDetails = data.contents?.singleColumnMusicWatchNextResultsRenderer?.tabbedRenderer?.watchNextTabbedResultsRenderer?.tabs?.[0]?.tabRenderer?.content?.musicQueueRenderer?.contents?.[0]?.playlistPanelVideoRenderer;

        if (videoDetails) {
            return {
                autor: '🜲 ᵖᵃᵗᵒ',
                status: true,
                data: {
                    videoId: videoId,
                    title: videoDetails.title?.runs?.[0]?.text || '',
                    artist: videoDetails.longBylineText?.runs?.[0]?.text || '',
                    duration: parseDuration(videoDetails.lengthText?.runs?.[0]?.text || ''),
                    viewCount: 0, // No disponible en esta respuesta
                    thumbnails: videoDetails.thumbnail?.thumbnails || [],
                    description: '',
                    isLive: false,
                    keywords: []
                }
            };
        }

        // Fallback a scraping web
        const webResponse = await axios.get(`https://music.youtube.com/watch?v=${videoId}`, {
            headers: musicHeaders,
            timeout: 10000
        });

        const playerMatch = webResponse.data.match(/var ytInitialPlayerResponse = ({.+?});/s);
        if (playerMatch) {
            const playerData = JSON.parse(playerMatch[1]);
            const videoDetails = playerData.videoDetails;
            
            if (videoDetails) {
                return {
                    autor: '🜲 ᵖᵃᵗᵒ',
                    status: true,
                    data: {
                        videoId: videoId,
                        title: videoDetails.title,
                        artist: videoDetails.author,
                        duration: parseInt(videoDetails.lengthSeconds),
                        viewCount: parseInt(videoDetails.viewCount),
                        thumbnails: videoDetails.thumbnail?.thumbnails || [],
                        description: videoDetails.shortDescription,
                        isLive: videoDetails.isLiveContent,
                        keywords: videoDetails.keywords || []
                    }
                };
            }
        }

        throw new Error('No se pudieron extraer los metadatos');
        
    } catch (error) {
        console.error('Error en YouTube Music metadata:', error.message);
        return {
            autor: '🜲 ᵖᵃᵗᵒ',
            status: false,
            data: null
        };
    }
}
