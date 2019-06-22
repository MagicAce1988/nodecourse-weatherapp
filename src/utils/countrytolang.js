const countryToLang = (countryCode)=>{
    const clangcodesS = 'AF ps AL sq DZ ar AS en AD ca AO pt en AG en AR es AM hy AW nl AU en AT de AZ az BS en BH ar BD bn BB en BY be BE nl BZ en BJ fr BM en BT dz BO es BA bs BW en BV no BR pt IO en BN en BG bg BF fr BI en KH km CM en CA en CV pt KY en CF fr TD fr CL es CN zh CX en CC en CO es KM fr CG fr CD fr CK en CR es CI fr HR hr CU es CY en CZ cs DK da DJ fr DM en DO es EC es EG ar SV es GQ fr ER ti EE et ET am FK en FO da FJ en FI fi FR fr GF fr PF fr TF fr GA fr GM en GE ka DE de GH en GI en GR el GL en GD en GP fr GU en GT es GN fr GW pt GY en HT fr HM en HN es HK en HU hu IS is IN hi ID id IR fa IQ ar IE ga IL he IT it JM en JP ja JO ar KZ ru KE en KI en KP ko KR ko KW en KG ru LA lo LV lv LB ar LS en LR en LY ar LI de LT lt LU fr MO pt MK mk MG fr MW en MY ms MV dv ML fr MT en MH en MQ fr MR ar MU en YT fr MX es FM en MD ro MD fr MN mn MS en MA ar MZ pt MM my NA en NR en NP ne NL nl AN nl NC fr NZ en NI es NE fr NG en NU en NF en MP en NO no OM ar PK ur PW en PS en PA es PG en PY es PE es PH en PN en PL pl PR es QA ar RE fr RO ro RU ru RW en SH en KN en LC en PM en VC en WS en SM it ST pt SA ar SN fr CS sr SC en SL en SG en SK sk SI sl SB en SO ar ZA en GS en ES es LK si SD en SR nl SJ en SZ en SE sv CH fr SY ar TW zh TJ ru TZ en TH th TL en TG fr TK en TO en TT en TN ar TR tr TM ru TC en TV en UG en UA uk AE ar GB en US en UM en UY es UZ uz VU en VE es VN vi VG en VI en WF fr EH en YE ar ZM en ZW en'
    const clangcodesA = clangcodesS.split(' ')

    let langCode = 'en';
    
    for (i=0; i<clangcodesA.length; i++) {
        if (clangcodesA[i]===countryCode){
            langCode=clangcodesA[i+1]
        }
    }

    return langCode

} 

module.exports = countryToLang