import Mock from 'mockjs'
// 返回 banner 和 推荐
Mock.mock('/api/case', 'get', () => {
  return Mock.mock({
    "banner": [{
        "link": "https://act.mogujie.com/zzlx67",
        "image": "https://img12.360buyimg.com/pop/s1180x940_jfs/t1/207776/4/23805/49932/62cd2981E9c8d3997/02fc9b55ae8aea95.jpg.webp",
        "name": "图片1"
      },
      {
        "link": "https://lps.jd.com/pc/psp/66326038478?imup=CgYKABIAGAASEwjOj9yK9wEQh7DsBBoAIIIHKAEYsBsgACombWl4dGFnX2ksdWUseGdlLGdpYSxjaWEsZl9iYV9mbF9sMTYzMzMyCG1peHRhZ19pSrwBSXxNSVhUQUdfSVIsSV9BX0ZMX1IsSV9BX1JFX0xDLElfQV9QTF9SLElfQV9TTF9SLElfQV9DU19MQyxJX0FfUlNfUixJX1VfRkxfTDIxMzQyLElfU19GTF9MQyxJX1JfRkxfUixJX1BfRkxfUixJX1BfTlBMX0xDLElfR19YR19SLElfR19STF9MQyxJX0JfRkxfUixHSUEsWEdFLFVCfDtGfE1JWFRBR19GUixGX0JBX0ZMX0wxNjMzM3w&extension_id=eyJhZCI6IjM1MDQiLCJjaCI6IjIiLCJza3UiOiI2NjMyNjAzODQ3OCIsInRzIjoiMTY1Nzc4MjUxNCIsInVuaXFpZCI6IntcImNsaWNrX2lkXCI6XCJkYjIwMTNhYy04Y2I1LTQzNTAtYjQxNi02OGVjZTRmMTY2YTdcIixcIm1hdGVyaWFsX2lkXCI6XCI5MTA0NTE5Nzg5NDE4ODgwMDAzXCIsXCJwb3NfaWRcIjpcIjM1MDRcIixcInNpZFwiOlwiY2M0ODIyYWUtOWY1OC00OWNlLTlmMDItYzhjODJhMTBiMGU5XCJ9In0=&jd_pop=db2013ac-8cb5-4350-b416-68ece4f166a7&abt=0",
        "image": "https://imgcps.jd.com/ling4/100026667878/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa5f/8d0027fb/cr/s/q.jpg",
        "name": "图片2"
      },
      {
        "link": "https://act.mogujie.com/zzlx67",
        "image": "https://img30.360buyimg.com/pop/s1180x940_jfs/t1/19165/14/16408/97208/628bbaf4E27b43b5b/138a6d487fdedbab.jpg.webp",
        "name": "图片3"
      },
      {
        "link": "https://act.mogujie.com/zzlx67",
        "image": "https://imgcps.jd.com/ling4/100025520132/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa68/fe827a49/cr/s/q.jpg",
        "name": "图片4"
      }
    ],
    "recommon": [{
        "link": "https://fresh.jd.com/?skuId=100014164727_10042638457518&groupId=03312682&productId=09649880",
        "image": "https://img14.360buyimg.com/img/s200x200_jfs/t1/198408/4/7387/102510/61380757Ec1aa6086/377a5d5d6ece242f.jpg!cc_100x100.webp",
        "title": "生鲜馆"
      },
      {
        "link": "https://search.jd.com/Search?keyword=%E6%96%B0%E6%9C%BA%E5%8F%91%E5%B8%83&enc=utf-8&wq=%E6%96%B0%E6%9C%BA%E5%8F%91%E5%B8%83&pvid=8d21e9d23082426683214ef368af078e?skuId=100035140122_10045864191364&groupId=03312682&productId=09173998",
        "image": "https://img13.360buyimg.com/img/s200x200_jfs/t1/100108/18/24763/35565/6227cde3E763ca4aa/f0c4d8142f0ca6f3.jpg!cc_100x100.webp",
        "title": "新机发布"
      },
      {
        "link": "https://shuma.jd.com/?skuId=567895_100002237037&groupId=03312682&productId=09168779",
        "image": "https://img30.360buyimg.com/img/s200x200_jfs/t1/45325/22/15182/166212/5dc3d811E1795fe79/c6f576718dba1566.jpg!cc_100x100.webp",
        "title": "智能数码"
      },
      {
        "link": "https://chaoshi.jd.com/?skuId=16239208399_501085&groupId=03312682&productId=09181429",
        "image": "https://img14.360buyimg.com/img/s200x200_jfs/t19429/345/2114569686/193072/6f671ab/5ae74720N203d91fc.jpg!cc_100x100.webp",
        "title": "京东超市"
      }
    ],
  })
})

var Random = Mock.Random
// 模拟分页
Mock.mock('/homegoods', 'post', (params) => {
  console.log(params);
  var page = JSON.parse(params.body).page,
    pageNum = JSON.parse(params.body).pageNum
    // type = JSOn.parse(params.body).type
  var list = []
  for (let i = 0; i < 200; i++) {
    var newlist = {
        'id': i+1, // id
        'show': {
          'color': Random.color(),
          'h': Random.integer(260, 300),
          'img':Random.image()
        },
        'url': Random.url(), // 生成地址,
          'title': Random.title(),
          'orgPrice': '￥' + Random.float(100, 10000, 2, 2),
          'price': '￥' + Random.float(100, 1000, 2, 2),
          'sale': Random.integer(1, 1000),
          'shopId': Random.integer(100, 100000),
          'cfav': null
    }
    //根据页码和数量 返回的数据
    if (i < page * pageNum && i >= (page - 1) * pageNum) {
      list.push(newlist)
    }
  }
  return list
})

// 详情页
Mock.mock('/detaillist','post',(params) => {
  console.log(params);
  // var detaillist = JSON.parse(params.body);
  var list = [];
  // var detaillist = []
  for (let i = 0; i < 200; i++) {
    var newlist = {
        'id': i+1, // id
        'show': {
          'color': Random.color(),
          'h': Random.integer(260, 300),
          'img':Random.image()
        },
        'url': Random.url(), // 生成地址,
          'title': Random.title(),
          'orgPrice': '￥' + Random.float(100, 10000, 2, 2),
          'price': '￥' + Random.float(100, 1000, 2, 2),
          'sale': Random.integer(1, 1000),
          'shopId': Random.integer(100, 100000),
          'cfav': null
    }
    //根据页码和数量 返回的数据
      list.push(newlist)
  }
  return list
})