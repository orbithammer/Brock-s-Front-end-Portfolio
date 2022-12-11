import { contentArray } from "./data.js"

const heroWrapper = document.getElementById("hero-wrapper")
const contentFeed = document.getElementById("content-feed")
const viewMoreBtnWrapper = document.getElementById("view-more-btn-wrapper")
// const featured = document.getElementById("featured")
let isArticleClicked = false
let feedRange = 3

document.addEventListener("click", e => {
    if(e.target.dataset.click) {
        handleClick(e.target.dataset.click)
    } else if(e.target.dataset.viewmore) {
        viewMore()
    } else if(e.target.dataset.social){
        handleSocial(e.target.dataset.social)
    }
})

function handleClick(articleKeyword) {
    // console.log(`articleKeyword`, articleKeyword)
    window.location.href = `html/${articleKeyword}.html`
    isArticleClicked = true
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

function render() {
    heroWrapper.innerHTML = getHero()
    contentFeed.innerHTML = getFeed()
    if(isArticleClicked === false) {
        const hero = document.getElementById("hero")
        hero.style.backgroundImage = `url("images/${contentArray[0].keyword}.png")`
    }
}

render()