<template>
    <div>
        <h1>SAMPLE Survey Results</h1>
        <img src="@/assets/responseMockUp.png" class="mockup" />

    </div>
</template>

<script>
export default {
    name: "SurveyResults",
    props: ["id"],
    data() {
        return {
            isLoaded: false,
            surveyBase: "https://esip-dev-02.edacnm.org/api/get_survey/",
            fetchURL: "",
            surveyContent: {},
        };
    },
    methods: {
        fetchResults(id) {
            console.log("entering fetchResults");
            this.isLoaded = false;
            //console.log("Trying to retrieve survey results for this survey: ", id);
            this.fetchURL = this.surveyBase.concat(id);
            console.log("Request URL: ", this.fetchURL);
            fetch(this.fetchURL, {
                method: "GET",
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error();
                }
            })
            .then((result) => {
                this.surveyContent = result;
                console.log(this.surveyContent);
                //console.log(obj2string(this.surveyContent));
            })
            .catch(() => {});
        }},

};  
</script>

<style scoped>

.mockup {
    width: 90%;
}

</style>