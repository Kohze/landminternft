import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://api.relysia.com',
})

export default instance

export const SERVICE_ID = '3a1958c1-929b-438b-8228-e9008501f703'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let selectorNumber = getRandomInt(10);
let creList = [{
  ma: 'jer34',
  se: '4jk34b123dasd'
},
{
  ma: 'jer42a',
  se: '4jkgg34bkasldggs'
},
{
  ma: 'jer56s',
  se: '4jdas4b123dasd'
},
{
  ma: 'jer61g', 
  se: '4jk34b123dagassd'
},
{
  ma: 'jer79s',
  se: '4jk34web123dasd'
},
{
  ma: 'jer81x',
  se: '4jllb123dasd'
},
{
  ma: 'jer9q',
  se: '4jk3asmd23dasd'
  },
  {
    ma: 'jer10w',  
    se: '4jkrotr123dasd'
  },
  {
    ma: 'jer11e',  
    se: '4jk34basnmdasd'
  },
  {
    ma: 'jer12r',  
    se: '4jk34b1lkfsd'
  }    
]


let preMA = creList && creList[selectorNumber].ma + '@' + 'vnx.' + 'com'
export const MA = preMA
export const SE = creList[selectorNumber].se
