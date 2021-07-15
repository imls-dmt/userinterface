<template>
    <div>
        <h1>Survey: n{{ this.label}} </h1>
        Survey content ...
        <hr />
        <p class="diagnostic">{{ this.id }}</p>

    </div>
</template>

<script>
export default {
    name: "Survey",
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
        fetchSurvey(id) {
            console.log("entering fetchSurvey");
            this.isLoaded = false;
            console.log("Trying to retrieve survey content for this survey: ", id);
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
        },
        //broken
        //obj2string(data){
        //    fs = '<div class="formdiv">'
        //        fs = fs + '<h1 class="formheader">' + data['label'] + '</h1>'
        //        fs = fs + '<form action="'+server+'/api/submit_survey/'+uuid+'" method="post">'
        //        fs = fs + '<input type="hidden" id="submitterid" name="submitter" value="'+uuidv4()+'">'    
        //        for (var j = 0; j < data['question_groups'].length; j++) {
        //            fs = fs + '<fieldset class="formfieldset" ><legend>' + data['question_groups'][j]['label'] + '</legend>'
        //                for (var k = 0; k < data['question_groups'][j]['questions'].length; k++) {
        //                    q=data['question_groups'][j]['questions'][k]
        //                    if (q['element']=='input'){
        //                    
        //                        if (q["input_type"]=="range"){
        //                            console.log(q["options"][0]['key'])
        //                            fs = fs + '<br><label class="formlabel" for="'+q['id']+'">'+q['label']+'</label><br>'
        //                           // fs = fs + '<span><input class="forminput" type="'+q['input_type']+'" id="'+q['id']+'" name="'+q['id']+'" >''</span><br>'
//
        //                            fs = fs + '<span>'+q["options"][0]['key']+'<input class="forminput" type="'+q['input_type']+'" id="'+q['id']+'" name="'+q['id']+'" min="'+q["options"][0]['value']+'" max="'+ q["options"][1]['value']+'" >'+q["options"][1]['key']+'</span><br>'
//
        //                        }else{
        //                            fs = fs + '<br><label class="formlabel" for="'+q['id']+'">'+q['label']+'</label><br>'
        //                            fs = fs + '<input class="forminput" type="'+q['input_type']+'" id="'+q['id']+'" name="'+q['id']+'" ><br>'
        //                        }
        //                    }
        //                    if (q['element']=='select'){
        //                        fs = fs +'<br><label for="'+q['id']+'">'+q['label']+'</label>'
        //                        fs = fs +'<select class="formoption" name="'+q['id']+'" id="'+q['id']+'">'
        //                            for (var l = 0; l < q['options'].length; l++) {
        //                                fs = fs +'<option value="'+q['options'][l]['value']+'">'+q['options'][l]['key']+'</option>'
        //                            }
        //                        fs = fs +'</select><br>'
        //                    }
        //                }
        //            fs = fs + '</fieldset>'
        //            fs=fs+'   <input type="submit" value="Submit"> </form>'
        //        }
        //        fs = fs + '</div>'
        //    return fs
        //}

},
created() {
    this.fetchSurvey(this.id);
},


};  
</script >
    .diagnostic {
        font-size: xx-small;
    }
<style scoped></style>