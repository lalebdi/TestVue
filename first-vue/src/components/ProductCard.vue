<template>
    <div>
        <b-col>
            <b-card :title="name" img-src="https://unsplash.com/photos/M0WbGFRTXqU" img-alt="Fire safety Product" img-top tag="article" style="max-width:20rem" class="mb-2" footer="Card Footer">
            <b-card-text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, minus?
            </b-card-text>
            <b-button variant="primary" v-b-tooltip.hover title="More about the product">More info</b-button>
            </b-card>
        </b-col>
    </div>
</template>

<script>
export default {
    props: ['name']
}
</script>

<style lang="scss" scoped>

</style>