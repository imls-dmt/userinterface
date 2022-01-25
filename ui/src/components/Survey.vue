<template>
    <div  v-if="surveyLoaded && resourceLoaded">
        <h1>Submit feedback for <router-link :to="`/Resource/${resource.id}`" target="_blank"> <i>{{ resource.title }}</i> </router-link> learning resource</h1>.
        <form @submit.prevent="submitSurvey">
            <div v-for="(group, g_index) in surveyContent.question_groups" :key="group">
                <div v-for="(question, q_index) in group.questions" :key="question">
                    <div v-if="question.element == 'input'" class="form-group">
                        <div v-if="question.input_type == 'range'">
                            <p class="debug">{{ g_index }}.{{ q_index }} - {{ question.element }}/{{ question.input_type }} (check: range): {{ question.name}}</p>
                            <div class="question_block">
                                <label :for="question.name" class="question"><b>{{ question.label }}</b></label><br/>
                                <input :name="question.name" :id="question.name" type="range" v-model="submission[question.id]" :min="question.options[0]['value']" :max="question.options[0]['value']" />
                            </div>
                        </div>
                        <div v-else class="question_block">
                            <p class="debug">{{ g_index }}.{{ q_index }} - {{ question.element }}/{{ question.input_type }} (check: not range): {{ question.name}}</p>
                            <label :for="question.name" class="question"><b>{{ question.label }}</b></label><br/>
                            <input :name="question.name" :id="question.name" :type="question.input_type" v-model="submission[question.id]" />
                        </div>
                    </div>
                    <div v-else-if="question.element == 'select'" class="select, question_block">
                        <p class="debug">{{ g_index }}.{{ q_index }} - {{ question.element }} (check: select): {{ question.name}}</p>
                        <label :for="question.name" class="question"><b>{{ question.label }}</b></label><br/>
                        <select :name="question.name" :id="question.name" v-model="submission[question.id]">
                            <option v-for="(option_value) in question.options" :key="option_value" :value="option_value.value" >{{ option_value.key }}</option>
                        </select>
                    </div>
                    <div v-else-if="question.element == 'textarea'" class="question_block">
                        <p class="debug">{{ g_index }}.{{ q_index }} - {{ question.element }} (check: select): {{ question.name}}</p>
                        <label :for="question.name" class="question"><b>{{ question.label }}</b></label><br/>
                        <textarea :name="question.name" :id="question.name"  v-model="submission[question.id]" rows=4 />
                    </div>
                </div>
            </div>
            <input type="submit" value="Submit" class="question_block"/>
        </form>
    </div>
</template>

<script>
//import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    name: "Survey",
    props: ["id"],
    data() {
        return {
            surveyLoaded: false,
            resourceLoaded: false,
            formSubmitted: false,
            surveyBase: "https://dmtc-devel.org/api/get_survey/",
            resourceBase: "https://dmtc-devel.org/api/resources/?facet_limit=0&id=",
            postBase: "https://dmtc-devel.org/api/submit_survey/",
            fetchURL: "",
            resource: {},
            surveyContent: {},
            postResponse: {},
            fieldset: "",
            submission: {
                respondent_id: ""
            }
        };
    },
    created() {
        this.fetchSurvey(this.id);
    },
    methods: {
        fetchSurvey(id) {
            console.log("entering fetchSurvey");
            this.surveyLoaded = false;
            console.log("Trying to retrieve survey structure for this survey: ", id);
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
                this.surveyLoaded = true;
                this.fetchResource(this.surveyContent.resourceid)
                //console.log(obj2string(this.surveyContent));
            })
            .catch(() => {});
        },
        submitSurvey() {
            this.submission.respondent_id = this.uuidv4();
            this.submission = this.toString(this.submission);
            this.submission = this.restructureSubmission(this.submission);
            console.log("Submission content:");
            console.log(JSON.stringify(this.submission));
            this.formSubmitted = false;
            console.log("Trying to submit the survey input to the server for survey: ", this.id)
            this.fetchURL = this.postBase.concat(this.id);
            console.log("Post URL: ", this.fetchURL);         
            fetch(this.fetchURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.submission)
            })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("No response was received or an error was encountered");
                    throw new Error();
                }
            })
            .then((result) => {
                this.postResponse = result;
                console.log(this.postResponse);
                this.formSubmitted = true;
                //console.log(obj2string(this.questions));
            })
            .catch(error => {
                this.errorMessage = error;
                console.error("there was an error!", error);
            });
        },
        fetchResource(id) {
            console.log("entering fetchResources");
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
        uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
        },
        toString(o) {
            Object.keys(o).forEach(k => {
                if (typeof o[k] === 'object') {
                return toString(o[k]);
            }
            o[k] = '' + o[k];
            });
            return o;
        },
        restructureSubmission(o) {
            var newSubmission = {"respondent_id": o.respondent_id, "answers": []};
            Object.keys(o).forEach(k => {
                if ( k != 'respondent_id') {
                    var newObject = {"question_id":k, "answer":o.[k]};
                    newSubmission.answers.push(newObject);
                 }
            });
            return newSubmission;        	
        },
    },

};  
</script>

<style scoped>

.debug {
    display: none;
}

.label {
    font-weight: bold;
}

.mockup {
    width: 90%;
}


.question_block {
    margin-top: 12px;
}

</style>