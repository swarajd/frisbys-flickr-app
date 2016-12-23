import Task from "data.task"
// import compose from "ramda/src/compose"
// import prop from "ramda/src/prop"
// import map from "ramda/src/map"
import {compose, prop, map} from "./utils"
import fetchJsonp from "fetch-jsonp"
// import $ from "jquery"

const url = t =>
    `http://api.flickr.com/services/feeds/photos_public.gne?&tags=${t}&format=json&jsoncallback=?`

const jsonToItems = prop("items")

const mediaToUrl = compose(prop("m"), prop("media"))
const img = url => {
    const ret = new Image()
    ret.src = url
    return ret
}

const mediaToImg = compose(img, mediaToUrl)

const itemsToImages = map(mediaToImg)

//impure
const renderImages = imgs => {
    for (let i of imgs) {
        document.body.appendChild(i)
    }
}

const trace = x => {
    console.log("data: ")
    console.log(x)
    return x;
}

// const custom_callback = x => x

const getJSON = uri =>
    new Task((rej, res) =>
        fetchJsonp(uri, {
            timeout: 5000,
            jsonpCallback: "jsoncallback"
        })
        .then(resp => resp.json())
        .then(res)
        .catch(rej))

const app = uri => 
    getJSON(uri)
    .map(trace)
    .map(jsonToItems)
    .map(itemsToImages)
    .map(renderImages)

const typeUrl = url("dogs")

app(typeUrl)
.fork(console.error, console.log)