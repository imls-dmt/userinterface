<template>
    <div v-if="surveyLoaded && questionsLoaded && resourceLoaded" >
        <!-- <h1>SAMPLE Survey Results</h1><img src="@/assets/responseMockUp.png" class="mockup" /> -->
        <h1>Feedback for the <router-link :to="`/Resource/${resource.id}`" target="_blank"> <i>{{ resource.title }}</i> </router-link> learning resource from the "<span class="title">{{ survey.label }}</span>" survey</h1>
        <div v-if="questions.length == 0">
             No responses have been received. 
        </div>
        <div class="stars" v-else>
            <img class="stars_image" src="@/assets/five-star.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 1}" />
            <img class="stars_image" src="@/assets/110x20-white.png" v-bind:style="{ marginLeft: starsLeftMargin+(starsWidth*overallAverage/5) + 'px', zIndex: 2}" />
            <img class="stars_image" src="@/assets/five-star-hollow.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 3}"/> 
            <div  v-bind:style="{ zIndex: 4 }">{{ overallAverage.toFixed(1) }}</div>
        </div>
        <div v-for="(item) in questions" :key="item">
            <div class="response_block">
                <h2 class="question">{{ item.label }}</h2>
                     <div v-if="item.type == 'select'">
                        <div class="stars_container">
                            <div v-if="item.answers_text.length == 0" class="stars_container">
                                <div class="stars">
                                    <img class="stars_image" src="@/assets/five-star-gray.png">
                                </div>
                            </div>
                             <div v-if="item.answers_text.length > 0" class="stars_container">
                                <div class="stars">
                                    <img class="stars_image" src="@/assets/five-star.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 1}" />
                                    <img class="stars_image" src="@/assets/110x20-white.png" v-bind:style="{ marginLeft: starsLeftMargin+(starsWidth*item.average/5) + 'px', zIndex: 2}" />
                                    <img class="stars_image" src="@/assets/five-star-hollow.png"  v-bind:style="{marginLeft: starsLeftMargin + 'px', zIndex: 3}"/> 
                                    <div  v-bind:style="{ zIndex: 4 }">{{ item.average.toFixed(1) }}</div>
                               </div>
                            </div>               
                        </div>
                    </div>
                <p><b>Responses:</b>
                    <span v-if="item.answers_text.length == 0">
                        No responses
                    </span>
                    <span v-else-if="item.answers_text.length > 0">
                        <ol>
                        <span v-for="(answer) in item.answers_text" :key="answer">
                            <li>{{ answer }}</li>
                        </span>
                        </ol>
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SurveyResults",
    props: ["id"],
    data() {
        return {
            surveyLoaded: false,
            questionsLoaded: false, 
            resourceLoaded: false, 
            questionsBase: "/api/survey_responses/questions/",
            surveyBase: "/api/surveys/?id=",
            resourceBase: "/api/resources/?facet_limit=0&id=",
            fetchURL: "",
            resource: {},
            questions: [],
            survey: {},
            overallAverage: -1,
            starsWidth: 92,
            starsLeftMargin: 30,
        };
    },
    
    created() {
        this.fetchSurvey(this.id);
        this.fetchQuestions(this.id);
    },
    
    methods: {
        fetchSurvey(id) {
            console.log("entering fetchSurvey");
            this.surveyLoaded = false;
            console.log("Trying to retrieve survey information for this survey: ", id);
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
                this.survey = result['surveys'][0];
                console.log(this.survey);
                this.surveyLoaded = true;
                this.fetchResource(this.survey.resourceid)
                //console.log(obj2string(this.questions));
            })
            .catch(() => {});
        },
        fetchQuestions(id) {
            console.log("entering fetchResults");
            this.questionsLoaded = false;
            console.log("Trying to retrieve survey results for this survey: ", id);
            this.fetchURL = this.questionsBase.concat(id);
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
                this.questions = result['answers'];
                console.log(this.questions);
                this.computeSummaryScore();
                this.questionsLoaded = true;
                //console.log(obj2string(this.questions));
            })
            .catch(() => {});
        },
        fetchResource(id) {
            console.log("entering fetchResults");
            this.resourceLoaded = false;
            console.log("Trying to retrieve information for LR: ", id);
            this.fetchURL = this.resourceBase.concat(id);
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
                this.resource = result['results'][0];
                console.log(this.resource);
                this.resourceLoaded = true;
                //console.log(obj2string(this.questions));
            })
            .catch(() => {});
        },
        computeSummaryScore() {
            let averageSum = 0;
            let averageCount = 0;
            this.questions.forEach(function (question) {
                if (question.average !== null) {averageCount = averageCount + 1}
                averageSum = averageSum + question.average
            });
            this.overallAverage = averageSum / averageCount;
        }
    },

};  
</script>

<style scoped>

.mockup {
    width: 90%;
}

.title { 
    font-style: italic;
}

div.response_block {
  outline: 1px solid blue;
  padding: 5px;
  margin: 5px;
}

h2.question {size: }

.stars_container {
    position: static;
    min-height: 20px;
}

.stars {
    position: static;
    top: 0px;
    left: 0px;
}

.stars_image {
    position: absolute;
    width: 92px;
    height:20px;    

}

</style>