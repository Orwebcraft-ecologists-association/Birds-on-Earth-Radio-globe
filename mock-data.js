// Mock radio stations data
const mockStations = [
    {
        stationuuid: 'mock-1',
        name: 'BBC Radio 1',
        country: 'United Kingdom',
        url_resolved: 'http://stream.live.vc.bbcmedia.co.uk/bbc_radio_one',
        geo_lat: 51.5074,
        geo_long: -0.1278,
        latitude: 51.5074,
        longitude: -0.1278
    },
    {
        stationuuid: 'mock-2',
        name: 'NPR',
        country: 'United States',
        url_resolved: 'https://npr-ice.streamguys1.com/live.mp3',
        geo_lat: 38.9072,
        geo_long: -77.0369,
        latitude: 38.9072,
        longitude: -77.0369
    },
    {
        stationuuid: 'mock-3',
        name: 'France Inter',
        country: 'France',
        url_resolved: 'https://icecast.radiofrance.fr/franceinter-midfi.mp3',
        geo_lat: 48.8566,
        geo_long: 2.3522,
        latitude: 48.8566,
        longitude: 2.3522
    },
    {
        stationuuid: 'mock-4',
        name: 'ABC Classic',
        country: 'Australia',
        url_resolved: 'https://live-radio01.mediahubaustralia.com/2LRW/mp3/',
        geo_lat: -33.8688,
        geo_long: 151.2093,
        latitude: -33.8688,
        longitude: 151.2093
    },
    {
        stationuuid: 'mock-5',
        name: 'NHK Radio Japan',
        country: 'Japan',
        url_resolved: 'https://radio-stream.nhk.jp/hls/live/2023229/nhkradiruakr1/master.m3u8',
        geo_lat: 35.6762,
        geo_long: 139.6503,
        latitude: 35.6762,
        longitude: 139.6503
    },
    {
        stationuuid: 'mock-6',
        name: 'Deutschlandfunk',
        country: 'Germany',
        url_resolved: 'https://st01.sslstream.dlf.de/dlf/01/128/mp3/stream.mp3',
        geo_lat: 52.5200,
        geo_long: 13.4050,
        latitude: 52.5200,
        longitude: 13.4050
    },
    {
        stationuuid: 'mock-7',
        name: 'Radio Nacional Argentina',
        country: 'Argentina',
        url_resolved: 'http://sa.mp3.icecast.magma.edge-access.net:7200/sc_rad1',
        geo_lat: -34.6037,
        geo_long: -58.3816,
        latitude: -34.6037,
        longitude: -58.3816
    },
    {
        stationuuid: 'mock-8',
        name: 'Metro FM',
        country: 'South Africa',
        url_resolved: 'https://metrofm.ice.infomaniak.ch/metrofm-128.mp3',
        geo_lat: -26.2041,
        geo_long: 28.0473,
        latitude: -26.2041,
        longitude: 28.0473
    },
    {
        stationuuid: 'mock-9',
        name: 'Radio Canada',
        country: 'Canada',
        url_resolved: 'https://ici.radio-canada.ca/premiere',
        geo_lat: 45.4215,
        geo_long: -75.6972,
        latitude: 45.4215,
        longitude: -75.6972
    },
    {
        stationuuid: 'mock-10',
        name: 'Classic FM',
        country: 'Netherlands',
        url_resolved: 'https://playerservices.streamtheworld.com/api/livestream',
        geo_lat: 52.3676,
        geo_long: 4.9041,
        latitude: 52.3676,
        longitude: 4.9041
    },
    {
        stationuuid: 'mock-11',
        name: 'Radio Moscow',
        country: 'Russia',
        url_resolved: 'http://icecast.vgtrk.cdnvideo.ru/rrzonam_mp3_192kbps',
        geo_lat: 55.7558,
        geo_long: 37.6173,
        latitude: 55.7558,
        longitude: 37.6173
    },
    {
        stationuuid: 'mock-12',
        name: 'All India Radio',
        country: 'India',
        url_resolved: 'http://air.pc.cdn.bitgravity.com/air/live/pbaudio001/playlist.m3u8',
        geo_lat: 28.6139,
        geo_long: 77.2090,
        latitude: 28.6139,
        longitude: 77.2090
    },
    {
        stationuuid: 'mock-13',
        name: 'Radio Brazil',
        country: 'Brazil',
        url_resolved: 'http://stream.radiojar.com/4wqre23dtwzuv',
        geo_lat: -15.7939,
        geo_long: -47.8828,
        latitude: -15.7939,
        longitude: -47.8828
    },
    {
        stationuuid: 'mock-14',
        name: 'China Radio',
        country: 'China',
        url_resolved: 'http://satelliteradio.cnr.cn',
        geo_lat: 39.9042,
        geo_long: 116.4074,
        latitude: 39.9042,
        longitude: 116.4074
    },
    {
        stationuuid: 'mock-15',
        name: 'Radio Egypt',
        country: 'Egypt',
        url_resolved: 'http://egyptradio.com/stream',
        geo_lat: 30.0444,
        geo_long: 31.2357,
        latitude: 30.0444,
        longitude: 31.2357
    },
    {
        stationuuid: 'mock-16',
        name: 'Radio New Zealand',
        country: 'New Zealand',
        url_resolved: 'https://radionz-ice.streamguys.com/national.mp3',
        geo_lat: -41.2865,
        geo_long: 174.7762,
        latitude: -41.2865,
        longitude: 174.7762
    },
    {
        stationuuid: 'mock-17',
        name: 'Sveriges Radio',
        country: 'Sweden',
        url_resolved: 'https://sverigesradio.se/topsy/direkt/132-hi-mp3.m3u',
        geo_lat: 59.3293,
        geo_long: 18.0686,
        latitude: 59.3293,
        longitude: 18.0686
    },
    {
        stationuuid: 'mock-18',
        name: 'KBS World Radio',
        country: 'South Korea',
        url_resolved: 'http://rki-live.cloudymusic.co.kr:1935/live/livestream/playlist.m3u8',
        geo_lat: 37.5665,
        geo_long: 126.9780,
        latitude: 37.5665,
        longitude: 126.9780
    },
    {
        stationuuid: 'mock-19',
        name: 'RAI Radio',
        country: 'Italy',
        url_resolved: 'https://icestreaming.rai.it/1.mp3',
        geo_lat: 41.9028,
        geo_long: 12.4964,
        latitude: 41.9028,
        longitude: 12.4964
    },
    {
        stationuuid: 'mock-20',
        name: 'Radio España',
        country: 'Spain',
        url_resolved: 'https://rtveradio.rtve.es/radio1.mp3',
        geo_lat: 40.4168,
        geo_long: -3.7038,
        latitude: 40.4168,
        longitude: -3.7038
    }
];
