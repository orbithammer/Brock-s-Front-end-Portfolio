import { contentArray } from "./data.js"

const heroWrapper = document.getElementById("hero-wrapper")
const contentFeed = document.getElementById("content-feed")
const viewMoreBtnWrapper = document.getElementById("view-more-btn-wrapper")
const recentPostsRange = 2

var clickedArticleKeyword = ``
let feedRange = 3

document.addEventListener("click", e => {
    if(e.target.dataset.click) {
        handleClick(e.target.dataset.click)
    } else if(e.target.dataset.viewmore) {
        viewMore()
    } else if(e.target.dataset.social){
        handleSocial(e.target.dataset.social)
    } else {
        console.log(e.target)
    }
})

function handleClick(articleKeyword) {
    // console.log(`articleKeyword`, articleKeyword)
    // globalVariables.clickedKeyword = articleKeyword
    // isArticleClicked = true
    console.log(`handleClick articleKeyword`,articleKeyword)
    localStorage.setItem("clickedArticleKeyword", articleKeyword)
    console.log(`set clickedArticleKeyword`, clickedArticleKeyword)
    window.open(`html/${articleKeyword}.html`, "_self")
    // render(articleKeyword)
}

function viewMore() {
    feedRange += 3
    render()
}

function handleSocial(socialKeyword) {
    if(socialKeyword === "linkedin") {
        window.open("https://www.linkedin.com/in/brock-penner-97322062/", "_blank")
    }
    if(socialKeyword === "mastodon") {
        window.open("https://techhub.social/@brockpenner", "_blank")
    }
    if(socialKeyword === "twitter") {
        window.open("https://www.twitter.com/BrockTIPenner", "_blank")
    }
    if(socialKeyword === "github") {
        window.open("https://www.github.com/orbithammer", "_blank")
    }
}

function getDate(dateData) {
    return new Date(dateData).toLocaleString("default", {year:"numeric", month:"long", day:"numeric"})
}

function getLeadIn(content) {
    // console.log(`content`, content)
    let leadIn = ""
    if (content.length > 200) {
        leadIn = content.slice(0, 197).concat("...")
    } else {
        leadIn = content
    }
    return leadIn
}

function getHero(){
    const { date, title, keyword, content } = contentArray[0]
    const heroDate = getDate(date)
    const heroLeadIn = getLeadIn(content)
   return `
    <article class="hero" id="hero" data-click="${keyword}">
            <p class="article-date" data-click="${keyword}">${heroDate}</p>
            <h1 data-click="${keyword}">${title}</h1>
            <p class="article-lead-in" data-click="${keyword}">${heroLeadIn}</p>
    </article>
    `
}

function getFeed(){
    let feedHtml = ``
    contentArray.forEach((article, index) => {
        const {content, date, keyword, title, alt} = article
        // console.log(`article vars`, content, date, keyword, link, title)
        let articleDate = getDate(date)
        let articleLeadIn = getLeadIn(content)
        if(index <= feedRange) {
            if(index != 0) {
                feedHtml += `
                <article class="article" data-click="${keyword}">
                    <img src="images/${keyword}.png" class="article-img" data-click="${keyword}" alt=${alt}>
                    <p class="article-date" data-click="${keyword}">${articleDate}</p>
                    <h1 data-click="${keyword}">${title}</h1>
                    <p class="article-lead-in" data-click="${keyword}">${articleLeadIn}</p>
                </article>
                `
            } 
        }
    })
    if(feedRange < (contentArray.length - 1)) {
        viewMoreBtnWrapper.innerHTML = `
        <button class="view-more-btn" data-viewMore="viewMore">View More</button>
        `
    } else {
        viewMoreBtnWrapper.innerHTML = ``
    }
    return feedHtml
}

function getRecentPostsFeed(clickedArticleObj) {
    const { keyword: clickedKeyword } = clickedArticleObj[0]
    let recentPostsHtml = ``
    const filteredContentArray = contentArray.filter(articleObj => articleObj.keyword != clickedKeyword)
    filteredContentArray.forEach((article,index) => {
        const { content, date, keyword, link, title } = article
        if(index <= recentPostsRange && clickedKeyword != keyword) { //TODO && article.keyword != clicked article keyword
            console.log(`recent posts feed var`,content, date, keyword, link, title)
            const articleDate = getDate(article.date)
            let leadIn = ""
            if (content.length > 200) {
                leadIn = content.slice(0, 200).concat("...")
            } else {
                leadIn = content
            }
            recentPostsHtml += `
                <article class="article" data-click="${keyword}">
                    <img src="/images/${keyword}.png" class="article-img" data-click="${keyword}">
                    <p class="article-date" data-click="${keyword}">${articleDate}</p>
                    <h1 data-click="${keyword}">${title}</h1>
                    <p class="article-lead-in" data-click="${keyword}">${leadIn}</p>
                </article>
                `
        }
    })
    return recentPostsHtml
}

function findClickedArticle() {
    return contentArray.filter(articleObj => {
        return articleObj.keyword === localStorage.getItem("clickedArticleKeyword")
    })
    console.log(`temp`, temp)
}

function getArticleHtml(clickedArticleObj) {
    // console.log(`clickedArticleObj`, clickedArticleObj)
    // console.log(typeof clickedArticleObj)
    const {content, date, keyword, link, title, alt} = clickedArticleObj[0]
    // console.log(date, title, content, link)
    // console.log(`unformatted date`, clickedArticleObj[0].date)
    // const articleDate = getDate(clickedArticleObj.date)
    let articleHtml = ``
    articleHtml = `
    <p class="clicked-article-date" id="clicked-article-date">${getDate(date)}</p>
    <h1>${title}</h1>
    <img src="/images/${keyword}.png" class="clicked-article-img" alt="${alt}">
    <p class="clicked-article-content">${content}</p>
    <a href="${link}" target="_blank" class="clicked-article-link">Check out my ${title} here!</a>
    `
    return articleHtml
}

function render(articleKeyword) {
    console.log(`render articleKeyword`,articleKeyword)
    let path = window.location.pathname;
    console.log(`path`, path)
    if(path === "/index.html" || path ==="/") {
        localStorage.clear()
        heroWrapper.innerHTML = getHero()
        contentFeed.innerHTML = getFeed()
        const hero = document.getElementById("hero")
        hero.style.backgroundImage = `url("images/${contentArray[0].keyword}.png")`
    } else if(path != "/html/about.html") {
        let clickedArticleObj = findClickedArticle()
        let clickedArticle = document.getElementById("clicked-article")
        clickedArticle.innerHTML = getArticleHtml(clickedArticleObj)
        let clickedArticleDateEl = document.getElementById("clicked-article-date")
        let recentPosts = document.getElementById("recent-posts")
        recentPosts.innerHTML = getRecentPostsFeed(clickedArticleObj)
    }
}

render()