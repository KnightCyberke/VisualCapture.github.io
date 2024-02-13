/**
 * @description: 侧边导航栏定位到的元素
 */
const homePage = document.querySelector("#home-page");
const aboutMe = document.querySelector('#about-me');
const imageType = document.querySelector('#image-type');
const gallery = document.querySelector('#gallery');
const contactMe = document.querySelector('#contact-me');

/**
 * @description: 获取导航栏元素
 */
let navActive = document.querySelector('.scroll.active');
let navList = document.querySelectorAll('.scroll');

/**
 * @description: 获取导航栏定位到的元素顶部的滚动距离
 */
const homePageTop = homePage.offsetTop;
const aboutMeTop = aboutMe.offsetTop;
const imageTypeTop = imageType.offsetTop;
const galleryTop = gallery.offsetTop;
const contactMeTop = contactMe.offsetTop;

/**
 * @param {HTMLAnchorElement} 
 * @listens scroll - 监听滚动事件
 */
window.addEventListener("scroll", (event) => {
    const currentScrollY = window.scrollY;

    /**
     * @description: 判断当前滚动距离是否大于等于导航栏元素顶部的滚动距离
     * @description: 如果大于等于导航栏元素顶部的滚动距离-300的滚动距离，导航栏元素定位到的元素的class添加active
     * @description: 如果小于导航栏元素顶部的滚动距离-300的滚动距离，导航栏元素定位到的元素的class移除active
     */
    if(currentScrollY >= homePageTop && currentScrollY < aboutMeTop - 300) {
        navActive.classList.remove('active');
        navList[0].classList.add('active');
        navActive = navList[0];
    } else if(currentScrollY >= aboutMeTop - 300 && currentScrollY < imageTypeTop - 300) {
        navActive.classList.remove('active');
        navList[1].classList.add('active');
        navActive = navList[1];
    } else if(currentScrollY >= imageTypeTop - 300 && currentScrollY < galleryTop - 300) {
        navActive.classList.remove('active');
        navList[2].classList.add('active');
        navActive = navList[2];
    } else if(currentScrollY >= galleryTop - 300 && currentScrollY < contactMeTop - 300) {
        navActive.classList.remove('active');
        navList[3].classList.add('active');
        navActive = navList[3];
    } else {
        navActive.classList.remove('active');
        navList[4].classList.add('active');
        navActive = navList[4];
    }
});


const body = document.querySelector("body");

/**
 * @description: 获取页面要实习动画的元素
 */
const animations = body.querySelectorAll(".animation");

/**
 * @description: 监听页面元素是否进入可视区域
 */
const observer = new IntersectionObserver((entries, observer) => {
    /**
     * @description: 监听对象的数据
     */
    let entry = entries[0];

    /**
     * @description: 获取元素的data-name属性值
     */
    let name = entry.target.dataset.name;

    /**
     * @description: 判断元素是否进入可视区域
     * @description: entry.isIntersecting && name === 'header'，当拥有data-name="header"属性的元素元素进入或离开视口的30%，执行动画
     * @description: entry.isIntersecting && name === 'about-me'，当拥有data-name="about-me"属性的元素元素进入或离开视口的30%，执行动画
     * @description: entry.isIntersecting && name === 'img'，当拥有data-name="img"属性的元素元素进入或离开视口的30%，执行动画
     * @description: entry.isIntersecting && name === 'gallery'，当拥有data-name="gallery"属性的元素元素进入或离开视口的30%，执行动画
     * @description: entry.isIntersecting && name === 'contact-me'，当拥有data-name="contact-me"属性的元素元素进入或离开视口的30%，执行动画
     */
    if(entry.isIntersecting && name === 'header'){
        const headerAnimation = homePage.querySelector('.container.animation');
        headerAnimation.style.animation = 'flexibleAnimation 2s';
    } else if(entry.isIntersecting && name === 'about-me') {
        const aboutMeAnimation = aboutMe.querySelector('.container.animation');
        aboutMeAnimation.style.animation = 'moveAnimation 4s';
    } else if(entry.isIntersecting && name === 'img') {
        const imgs = imageType.querySelectorAll('img');
        imgs.forEach(event => {
            event.style.animation = 'flexibleAnimation 2s';
        })
    } else if(entry.isIntersecting && name === "gallery") {
        const galleryAnimation = gallery.querySelector('.animation');
       galleryAnimation.style.animation = 'moveAnimation 4s';
    } else if(entry.isIntersecting && name === 'contact-me') {
        const colOne = contactMe.querySelector('.col-4');
        const coltwo = contactMe.querySelector('.col-8');
        colOne.style.animation = 'moveAnimation 4s';
        coltwo.style.animation = 'moveAnimation 4s 0.5s';

        observer.disconnect(); //触发最后一个监听时,断开监听
    }
},{
    rootMargin: '0px', //rootMargin参数指定了元素相对于视口的偏移量
    threshold: 0.3 //threshold参数指定了元素进入或离开视口的百分比。
});

animations.forEach(animation => {
    observer.observe(animation);
});

const ul = gallery.querySelector('ul');
/**
 * @description: 为图片类型列表添加点击事件
 * @description: 当点击事件触发时，执行图片类型列表的点击事件
 */
ul.addEventListener('click', (event) => {
    if(event.target.textContent === '全部') {
        event.target.classList.add('active'); //为被点击的元素添加active类
        deleteActive(event.target); //删除列表里的active类
        filtration('全部'); //过滤函数
    } else if(event.target.textContent === '自然景观') {
        event.target.classList.add('active');
        deleteActive(event.target);
        filtration('自然景观');
    } else if(event.target.textContent === '野生动物') {
        event.target.classList.add('active');
        deleteActive(event.target);
        filtration('野生动物');
    } else if(event.target.textContent === '城市生活') {
        event.target.classList.add('active');
        deleteActive(event.target);
        filtration('城市生活');
    } else if(event.target.textContent === '宇宙星空') {
        event.target.classList.add('active');
        deleteActive(event.target);
        filtration('宇宙星空');
    }
})

/**
 * @description: 删除列表里除被点击的元素的active类
 * @param {Element} target - 被点击的元素
 * @returns {undefined} - undefined
 */

function deleteActive(target) {
    const li = ul.querySelectorAll('li');
    li.forEach(event => {
        if(event !== target) {
            event.classList.remove('active');
        }
    })
}

/**
 * @description: 获取所有图片
 */
const figure = document.querySelectorAll('figure');

/**
 * @description: 过滤函数
 * @param {String} selected - 被点击的元素的data-type属性值
 * @returns {undefined} - undefined
 */
function filtration (selected) {
    console.log(selected);
    if(selected === '全部') {
        figure.forEach(event => {
            event.classList.remove('hidden','moveRight', 'moveLeft', 'moveRightTop', 'moveLiftTop');
            event.classList.remove('hiddenLeftbottom','hiddenLeft', 'hiddenRight', 'hiddenRightbottom');
            event.classList.add('return');
        })
        return
    };

    figure.forEach(event => {
        if(event.dataset.type === selected) {
            event.classList.remove('hidden','moveRight', 'moveLeft', 'moveRightTop', 'moveLiftTop', 'return');
            event.classList.remove('hiddenLeftbottom','hiddenLeft', 'hiddenRight', 'hiddenRightbottom')
            addMove(event,selected);
        } else {
            classList = event.classList;
            if(classList.contains('moveRight') || classList.contains("moveLeft")
            || classList.contains('moveRightTop') || classList.contains('moveLiftTop')) {
            //classList.contains()方法用于判断元素的class属性中是否包含指定的类
                event.classList.remove('return');
                hiddenMove(event,selected);
            } else {
                event.classList.remove('return');
                event.classList.add('hidden');
            }
        }
    });
}

/**
 * @description: 添加浮现移动动画
 * @param {Element} event - 需要添加浮现移动动画的元素
 * @param {String} selected - 元素的data-type属性值
 * @returns {undefined} - undefined
 */

function addMove(event,selected) {
    if(selected === '自然景观') {
        event.classList.add('moveRightTop');
    } else if(selected === '野生动物') {
        event.classList.add('moveRight');
    } else if(selected === '城市生活') {
        event.classList.add('moveLeft');
    } else if(selected === '宇宙星空') {
        event.classList.add('moveLiftTop');
    }
}

/**
 * @description: 添加隐藏移动动画
 * @param {Element} event - 需要添加隐藏移动动画的元素
 * @param {String} selected - 元素的data-type属性值
 * @returns {undefined} - undefined
 */
function hiddenMove(event,selected) {
    console.log(selected);
    if(selected === '自然景观') {
        event.classList.add('hiddenLeftbottom');
    } else if(selected === '野生动物') {
        event.classList.add('hiddenLeft');
    } else if(selected === '城市生活') {
        event.classList.add('hiddenRight');
    } else if(selected === '宇宙星空') {
        event.classList.add('hiddenRightbottom');
    }
}