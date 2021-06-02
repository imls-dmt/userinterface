<!--
    This component is use to display an array of hero_images.  Code from
    https://thewebdev.info/2021/01/14/create-an-image-slider-app-with-vue-3-and-javascript/
    2 other component options:
    https://ismail9k.github.io/vue3-carousel/#quick-start and 
    https://www.vuescript.com/modern-carousel/ for image carousel components
-->
<template>
    <div class="img-box">
        <img
            :src="image.image_link"
            :alt="image.description"
            @error="remove(index)"
        /><br/>
        <div class=caption>
            {{image.description}}
        </div>
    </div>
</template>

<script>
export default {
    name: "HeroImages",
    props: ["data"],
    // images: this.data,

    data() {
        return {
            content: "",
            image: this.data[0],
            images: this.data,
            index: 0,
            interval: 5000, // milliseconds
        };
    },

    mounted() {
        this.image = this.images[0];
        this.autoChangeImage();
    },

    methods: {
        // setup interval for changing image
        autoChangeImage() {
            setInterval(() => {
                this.next();
            }, this.interval);
        },

        // change the current image to display
        next() {
            this.index = (this.index + 1) % this.images.length;
            this.image = this.images[this.index];
        },

        // remove the image with the given index
        remove(index) {
            this.images.splice(index, 1);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
    padding: 0px 30px 10px;
}

.title {
    font-size: x-large;
    font-weight: bold;
    padding: 20px;
}

.img-box {
    flex: 0 1 300px;
    margin:auto;
}

.caption {
    font-size:8pt;
    text-align:center
}

img {
    width:100%;
}
</style>
