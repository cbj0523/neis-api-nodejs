const { getEducation, htmlCleaner } = require('./utils');
const { getSchoolCode } = require('./School')
const fetch = require('node-fetch')
const cheerio = require('cheerio');

const getMonthlyMenu = async (region, schoolname, year, month) => {
    let education = getEducation(region);
    let schoolcode = (await getSchoolCode(region, schoolname)).code;
    let schooltypeCode = (await getSchoolCode(region, schoolname)).type;

    var montlyMenu = [];
    var months = month

    if (!months.startsWith('0')) {
        months = `0${months}`
    }


    var url = `https://stu.${education}/sts_sci_md00_001.do?schulCode=${schoolcode}&schulCrseScCode=${schooltypeCode}&schulKndScCode=${schooltypeCode}&schYm=${year}${months}`
    console.log(url);
    await fetch(url)
        .then(res => res.text())
        .then(body => {
            let startPoint = body.indexOf('<tbody>');
            let endPoint = body.indexOf('</tbody>');
            let html = body.substring(startPoint, endPoint);
            /* let $ = cheerio.load(html);
            $('tbody > tr').each((index, element) => {
                let lunch = $(element).find('td > div').text();
                console.log(lunch);
            }); */

            html = htmlCleaner(html);
            html.forEach((element, index) => {
                if ( element != index+1) {
                    let data = element;
                    data = data.split('<br/>');
                    montlyMenu.push(data);
                }
    
            });
    });
    
    return montlyMenu;
}

const getDayMenu = async (region, schoolname, year, month, date) => {
    let monthMenu = await getMonthlyMenu(region, schoolname, year, month);

    let dateMenu;

    monthMenu.forEach(element => {
        if (element[0] == date) {
            dateMenu = element;
        } 
    });
    if (dateMenu == undefined) {
        console.log("급식이 없습니다.");
        return "급식이 없습니다"
    }

    var menu = {
        breakfast: '',
        lunch: '',
        dinner: '',
    };

    /* if (dateMenu.indexOf('[조식]') != -1) {
        dateMenu = dateMenu.split(',[조식],');
        dateMenu[1] = dateMenu[1].split(',[중식],');
        dateMenu[1][1] = dateMenu[1][1].split(',[석식],');
        menu.breakfast = dateMenu[1][0];
        menu.lunch = dateMenu[1][1][0];
        menu.dinner = dateMenu[1][1][1];
        if (dateMenu[2] && dateMenu[2].indexOf('[석식]') != -1) {
            dateMenu[2] = dateMenu[2].split(',[석식],');
        }
    } */

    console.log(dateMenu);

    var breakfastIndex = dateMenu.indexOf('[조식]');
    var lunchIndex = dateMenu.indexOf('[중식]');
    var dinnerIndex = dateMenu.indexOf('[석식]');
    console.log(breakfastIndex, lunchIndex, dinnerIndex);
    var breakfast, lunch, dinner;

    if (breakfastIndex != -1) {
        breakfast = dateMenu.filter((element, index) => lunchIndex != -1 ? index >= breakfastIndex && index < lunchIndex : index >= breakfast) 
        // 이때 잘못하면 breakfast 안에 dinner 값도 들어가는데 일단 처리하지 않았습니다. 조식이랑 석식만 먹는 학교는 없을 것 같아서요.
    }
    if (lunchIndex != -1) {
        lunch = dateMenu.filter((element, index) => dinnerIndex != -1 ? index >= lunchIndex && index < dinnerIndex : index >= lunchIndex);
    }
    if (dinnerIndex != -1 ) {
        dinner = dateMenu.filter((element, index) => index >= dinnerIndex)
    }

    var Menu = {
        breakfast,
        lunch,
        dinner,
    }

    console.log(Menu);
}

// getDayMenu("gyeonggi", "한국디지털미디어고등학교", "2019", "5", "8");
// getDayMenu("chungbuk", "원봉중학교", "2019", "05", "8")
// getDayMenu("chungnam", "한일고등학교", "2019", "5", "8");

module.exports.getMonthlyMenu = getMonthlyMenu;