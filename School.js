const { getEducation } = require('./utils');
const urlencode = require('urlencode');
const fetch = require('node-fetch')
const cheerio = require('cheerio');

const schoolType = {
    "kindergarden": 1,
    "elementary": 2,
    "middle": 3,
    "high": 4
};


const getSchoolCode = async (region, schoolname) => {
    let name = urlencode.encode(schoolname);
    let schoolcode;
    let schooltypecode;
    let education = getEducation(region);

    var url = `https://par.${education}/spr_ccm_cm01_100.do?kraOrgNm=${name}`
   
    await fetch(url)
        .then(res => res.json())
        .then(body => {
            schoolcode = body.resultSVO.data.orgDVOList[0].orgCode;
            schooltypecode = body.resultSVO.data.orgDVOList[0].schulCrseScCode;
        });
    return {
        code: schoolcode,
        type: schooltypecode
    }
}

module.exports.getSchoolCode = getSchoolCode;