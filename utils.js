const educationCode = {
    "seoul": "sen.go.kr",
    "incheon": "ice.go.kr",
    "busan": "pen.go.kr",
    "gwangju": "gen.go.kr",
    "daejeon": "dje.go.kr",
    "sejong": "sje.go.kr",
    "ulsan": "use.go.kr",
    "gyeonggi": "goe.go.kr",
    "kangwon": "kwe.go.kr",
    "cheongbuk": "cbe.go.kr",
    "chungnam": "cne.go.kr",
    "gyeongbuk": "gbe.go.kr",
    "gyeongnam": "gne.go.kr",
    "jeonbuk": "jbe.go.kr",
    "jeonnam": "jne.go.kr",
    "jeju": "jje.go.kr"
};

const getEducation = (region) => {
    let education;
    switch (region) {
        case "seoul":
            education = educationCode.seoul
            break;
        case "incheon":
            education = educationCode.incheon
            break;
        case "busan":
            education = educationCode.busan
            break;
        case "gwangju":
            education = educationCode.gwangju
            break;
        case "daejeon":
            education = educationCode.daejeon
            break;
        case "sejong":
            education = educationCode.sejong
            break;
        case "ulsan":
            education = educationCode.ulsan
            break;
        case "gyeonggi":
            education = educationCode.gyeonggi
            break;
        case "kangwon":
            education = educationCode.kangwon
            break;
        case "chungbuk":
            education = educationCode.cheongbuk
            break;
        case "chungnam":
            education = educationCode.chungnam
            break;
        case "gyeongbuk":
            education = educationCode.gyeongbuk
            break;
        case "gyeongnam":
            education = educationCode.gyeongnam
            break;
        case "jeonbuk":
            education = educationCode.jeonbuk
            break;
        case "jeonnam":
            education = educationCode.jeonnam
            break;
        case "jeju":
            education = educationCode.jeju
            break;
        default:
            education = educationCode.seoul
            break;
    }
    return education;
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}    

const htmlCleaner = (text) => {
    let html = text;

    html = replaceAll(html, '<tbody>', '');
    html = replaceAll(html, '</tbody>', '');
    html = replaceAll(html, '\r', '');
    html = replaceAll(html, '\t', '');
    html = replaceAll(html, '\n', '');
    html = replaceAll(html, ' ', '');
    html = replaceAll(html, '<tr>', '');
    html = replaceAll(html, '</tr>', '');
    html = replaceAll(html, '<td>', '');
    html = replaceAll(html, '</td>', '');
    html = replaceAll(html, '</div>', '');
    html = replaceAll(html, '<tdclass="last">', '');
    html = replaceAll(html, '&amp', '');
    html = html.split('<div>');
    html = html.filter(data => data != '');

    return html;
}

module.exports.getEducation = getEducation;
module.exports.htmlCleaner = htmlCleaner;