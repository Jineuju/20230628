let sections = document.querySelectorAll("main section");
//유사배열로 section을 배열의 형태로 변수에 담는것
//배열의 형태로 변경
let sections_arr = Array.from(sections);
let lis = document.querySelectorAll("ul li");
let lis_arr = Array.from(lis);

let ul = document.querySelector("ul");

// let posArr = [];

let lastSection = sections[sections.length - 1];
let lastHeight = lastSection.offsetTop + lastSection.offsetHeight;

let posArr = null;

setPos();
function setPos() {
    posArr = [];
    for (let el of sections) {
        posArr.push(el.offsetTop);
    }
    posArr.push(lastHeight);
}
// [0, 1000, 2000, 2900, 4600]

window.addEventListener("scroll", () => {
    let scroll = window.scrollY || window.pageYOffset
        || document.documentElement.scrollTop;

    sections.forEach((el, index) => {
        if (scroll >= posArr[index]) {
            for (let el of lis) {
                el.classList.remove("on");
            }
            lis[index].classList.add("on");

            for (let el of sections) {
                el.classList.remove("on");
            }
            sections[index].classList.add("on");
        }
    })

})

// window.addEventListener("mousewheel", (e)=>{
//     // 우리는 마우스휠을 한번 내리면 그 내린만큼의 스크롤을 이동하려는
//     // 목적이 아니라 휠 한번에 section의 한 index를 이동시킬 이벤트를
//     // 만들 예정입니다. 따라서 마우스휠이라는 이벤트가 가지고 있는 
//     // 프리이벤트를 정지시켜야합니다
//     e.preventDefault();

//     // 1. 버튼으로 on클래스를 추적해서 활성화되어있는 index를 구별하는 코드
//     let activeLi = ul.querySelector("li.on");
//     let activeLi_index = lis_arr.indexOf(activeLi);

//     // 2. 버튼이 아닌, section의 on클래스로 활성화되어있는 index를 구별하는 코드
//     let activeS = document.querySelector("section.on");
//     let activeS_index = sections_arr.indexOf(activeS);


//     // 위에서 추적한 인덱스를 사용해서 마우스 휠을 올렸다면 인덱스에
//     // -1을 해서 하단의 movescroll함수를 호출하면 이동 가능
//     // 그렇다면 마우스 휠을 올렸는지 내렸는지 추적해야합니다

//     /*
//     mousewheel 이벤트 객체
//     deltaY만 알면 됩니다(세로로 이동)
//     : 마우스휠의 수직 스크롤 변화량을 나타냅니다.
//     양수값은 아래로 스크롤 하는 것을 의미
//     음수값은 위로 스크롤 하는 것을 의미
//     일반적으로 100단위 이동거리를 나타냅니다


//     deltaX, Z
//     */

//     if(e.deltaY < 0){ // -100
//         console.log("마우스휠을 올렸습니다")
//         if(activeLi_index == 0) return;
//         moveScroll(activeLi_index - 1 );
//     }else{ // 100
//         console.log("마우스휠을 내렸습니다")
//         if(activeLi_index == 3) return;
//         moveScroll(activeLi_index + 1 );
//     }

// }, { passive : false })
/*
이벤트 리스너의 옵션 객체에는 몇가지 속성이 있습니다
captureEvents : 이벤트 캡쳐의 여부를 나타내는 boolean속성입니다
기본값은 false, true로 설정하면 이벤트캡쳐를 허용합니다

once : 이벤트 핸들러를 한번만 실행할지 여부를 나타내는 boolean속성입니다
기본값은 false, true면 한번만 실행합니다

passive : false
: 이벤트 핸들러가 기본동작을 방지하는지의 여부를 나타내는 boolean값의 속성입니다
만약 true면 e.preventDefault();을 호출해도 기본동작이 방지되지 않습니다.
*/
// el.addEventListener("click", ()=>{}, {여기 세번째에 사용})


window.addEventListener("mousewheel", (e)=>{
    let delta = e.deltaY;
    let parent_item = lis_arr[0].parentNode;
    // 첫째야 부모가 누구니?
    let active_lis = parent_item.querySelector(".on");
    let active_lis_index = lis_arr.indexOf(active_lis);
    let target;

    if(delta < 0) target = posArr[active_lis_index - 1];
    if(delta > 0) target = posArr[active_lis_index + 1];

    scrollAni(target, 500);
    
}, )

function scrollAni(target, duration){
    let scroll = window.scrollY || window.pageYOffset
        || document.documentElement.scrollTop;
    let startTime = performance.now();
    // 초기 페이지 로딩부터 함수가 실행되는 시간을 의미합니다

    function scrollStep(timestamp){
        let currentTime = timestamp - startTime;
        let progress = Math.min(currentTime / duration, 1)
        let scrollPos = scroll + (target - scroll) * progress;

        window.scrollTo(0, scrollPos);
        if(currentTime < duration){
            requestAnimationFrame(scrollStep);
        }
    }
    requestAnimationFrame(scrollStep);
}

lis.forEach((el, index) => {
    el.addEventListener("click", () => {
        //해당 인덱스로 이동을 시키는 코드
        moveScroll(index);
    })
})

//함수로 해당 인덱스로 이동을 시키는 함수
function moveScroll(index) {
    window.scrollTo({ top: posArr[index], behavior: "smooth" });
}