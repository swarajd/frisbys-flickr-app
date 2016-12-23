import Task from "data.task"
import compose from "ramda/src/compose"
import prop from "ramda/src/prop"
import map from "ramda/src/map"
import $ from "jquery"
import { hellaUsed } from "./utils/uses"

const url = t =>
    `http://api.flickr.com/services/feeds/photos_public.gne?tags=${t}&format=json&jsoncallback=?`

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
    console.log(x)
    return x;
}

const getJSON = uri =>
    new Task((rej, res) =>
        $.getJSON(uri)
        .done(data => res(data))
        .fail((_, __, error) => rej(error)))

const app = uri => 
    getJSON(uri)
    .map(trace)
    .map(jsonToItems)
    .map(itemsToImages)
    .map(renderImages)

const cats = url("dogs")

app(cats)
.fork(console.error, console.log)