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
    window.open(`html/${articleKeyword}.html`, "_blank")
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
    let heroHtml = ``
    const heroDate = getDate(contentArray[0].date)
    const heroLeadIn = getLeadIn(contentArray[0].content)
    heroHtml += `
    <article class="hero" id="hero" data-click="${contentArray[0].keyword}">

            <p class="article-date" data-click="${contentArray[0].keyword}">${heroDate}</p>
            <h1 data-click="${contentArray[0].keyword}">${contentArray[0].title}</h1>
            <p class="article-lead-in" data-click="${contentArray[0].keyword}">${heroLeadIn}</p>

    </article>
    `
    return heroHtml
}

function getFeed(){
    let feedHtml = ``
    contentArray.forEach((article, index) => {
        // console.log(index, item)
        let articleDate = getDate(article.date)
        let articleLeadIn = getLeadIn(article.content)
        if(index <= feedRange) {
            if(index != 0) {
                feedHtml += `
                <article class="article" data-click="${article.keyword}">
                    <img src="images/${article.keyword}.png" class="article-img" data-click="${article.keyword}">
                    <p class="article-date" data-click="${article.keyword}">${articleDate}</p>
                    <h1 data-click="${article.keyword}">${article.title}</h1>
                    <p class="article-lead-in" data-click="${article.keyword}">${articleLeadIn}</p>
                </article>
                `
            } 
        }
    })
    if(feedRange < (contentArray.length)) {
        viewMoreBtnWrapper.innerHTML = `
        <button class="view-more-btn" data-viewMore="viewMore">View More</button>
        `
    } else {
        viewMoreBtnWrapper.innerHTML = ``
    }
    return feedHtml
}

function getRecentPostsFeed() {
    let recentPostsHtml = ``
    contentArray.forEach((article,index) => {
        if(index <= recentPostsRange) {
            const articleDate = getDate(article.date)
            let leadIn = ""
            if (article.content.length > 200) {
                leadIn = article.content.slice(0, 200).concat("...")
            } else {
                leadIn = article.content
            }
            recentPostsHtml += `
                <article class="article" data-click="${article.keyword}">
                    <img src="/images/${article.keyword}.png" class="article-img" data-click="${article.keyword}">
                    <p class="article-date" data-click="${article.keyword}">${articleDate}</p>
                    <h1 data-click="${article.keyword}">${article.title}</h1>
                    <p class="article-lead-in" data-click="${article.keyword}">${leadIn}</p>
                </article>
                `
        }
    })
    return recentPostsHtml
}

function findClickedArticle(articleKeyword) {
    console.log(`function clickedArticleKeyword`,clickedArticleKeyword)
}

function render(articleKeyword) {
    console.log(`render articleKeyword`,articleKeyword)
    let path = window.location.pathname;
    if(path === "/index.html") {
        localStorage.clear()
        heroWrapper.innerHTML = getHero()
        contentFeed.innerHTML = getFeed()
        const hero = document.getElementById("hero")
        hero.style.backgroundImage = `url("images/${contentArray[0].keyword}.png")`
    } else if(path != "/html/about.html") {
        let clickedArticleObj = findClickedArticle(clickedArticleKeyword)
        let clickedArticleDate = getDate()
        let clickedArticleDateEl = document.getElementById("clicked-article-date")
        let recentPosts = document.getElementById("recent-posts")
        recentPosts.innerHTML = getRecentPostsFeed()
    }
}

render()