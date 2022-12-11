import { contentArray } from "./data.js"

const recentPosts = document.getElementById("recent-posts")
const recentPostsRange = 2

document.addEventListener("click", e => {
    if(e.target.dataset.click) {
        handleClick(e.target.dataset.click)
    } else if(e.target.dataset.social){
        handleSocial(e.target.dataset.social)
    }
})

function handleClick(articleKeyword) {
    // console.log(`articleKeyword`, articleKeyword)
    window.location.href = `/html/${articleKeyword}.html`
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

function getFeed() {
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

function render() {
    recentPosts.innerHTML = getFeed()    
}

render()