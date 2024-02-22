<template>
    <b-field class="test" label="Экспорт данных" grouped>
        <a :href="props.url + getQueryString()">
            <b-button type="is-primary">
                <b-icon icon="download"></b-icon>
              
                    <span>  <slot> Загрузить файл </slot></span>
        
            </b-button>
        </a>
    </b-field>
</template>

<script setup>


const props = defineProps({
    queryString: {      
        default: () => {return '' }
    },
    url: {
        type: String
    }
})

const getQueryString = () => {
    let result = '?'
    try {
        for (const key in props.queryString) {
            result = result + `${key}=${props.queryString[key]}&`
        }
    }
    catch (err) {
        console.log(err)
        result = ''
    }

    return result
}

</script>

<style></style>