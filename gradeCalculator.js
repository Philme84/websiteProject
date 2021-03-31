let getEligibility = (course, c1 , c2, c3, c4, c5)=>{
    if(course == "digital_marketing" || course == "mechanical_engineering" || course == "computer_information_system"){
        let math = c1
        let english = c2
        let physics = c3
        let chemistry = c4
        let biology = c5

        if(math == 0){
            return {type: "warning", message:"The Math grade is not selected!"};
        }
        else if(english == 0){
            return {type: "warning", message:"The English grade is not selected!"};
        }
        else if(physics == 0){
            return {type: "warning", message:"The Physics grade is not selected!"};
        }
        else if(chemistry == 0){
            return {type: "warning", message:"The Chemistry grade is not selected!"};
        }
        else if(biology == 0){
            return {type: "warning", message:"The Biology grade is not selected!"};
        }

        if(math > 3 || english > 3 || physics > 3 || chemistry > 3 || biology > 3){
            return {type: "failure", message: "You are NOT eligible for selected course."};
        }
        else{
            return {type:"success", message: "You are eligible for selected course."};
        }
    }
    else{
        let math = c1
        let english = c2
        let business_studies = c3
        let echonomics = c4
        let physical_health_studies = c5

        if(math == 0){
            return {type: "warning", message:"The Math grade is not selected!"};
        }
        else if(english == 0){
            return {type: "warning", message:"The English grade is not selected!"};
        }
        else if(business_studies == 0){
            return {type: "warning", message:"The Business Studies grade is not selected!"};
        }
        else if(echonomics == 0){
            return {type: "warning", message:"The Echonomics grade is not selected!"};
        }
        else if(physical_health_studies == 0){
            return {type: "warning", message:"The Physical Health Studies grade is not selected!"};
        }

        if(math > 3 || english > 3 || business_studies > 3 || echonomics > 3 || physical_health_studies > 3){
            return {type: "failure", message: "You are NOT eligible for selected course."};
        }
        else{
            return {type:"success", message: "You are eligible for selected course."};
        }
    }
}

$("document").ready(()=>{
    let selectCourse = $("#course")
    selectCourse.change(()=>{
        if(selectCourse.val() == "digital_marketing" || selectCourse.val() == "mechanical_engineering" || selectCourse.val() == "computer_information_system"){
            $("#technical").removeClass("d-none")
            $("#literature").addClass("d-none")
        }
        else {
            $("#literature").removeClass("d-none")
            $("#technical").addClass("d-none")
        }
    })

    let warningModal = (text)=>{
        $("#modal-icon").addClass("fa-exclamation-triangle icon-yellow")
        $("#modal-icon").removeClass("fa-times-circle icon-red")
        $("#modal-icon").removeClass("fa-check-circle icon-green")
        $("#modal-text").html(text)
        $("#gradeCalculatorModelLabel").html("Warning")
    }

    let sucessgModal = (text)=>{
        $("#modal-icon").removeClass("fa-exclamation-triangle icon-yellow")
        $("#modal-icon").removeClass("fa-times-circle icon-red")
        $("#modal-icon").addClass("fa-check-circle icon-green")
        $("#modal-text").html(text)
        $("#gradeCalculatorModelLabel").html("Eligible")
    }

    let failuregModal = (text)=>{
        $("#modal-icon").removeClass("fa-exclamation-triangle icon-yellow")
        $("#modal-icon").addClass("fa-times-circle icon-red")
        $("#modal-icon").removeClass("fa-check-circle icon-green")
        $("#modal-text").html(text)
        $("#gradeCalculatorModelLabel").html("Not Eligible")
    }

    $("#gradeCalculatorForm").submit((e)=>{
        e.preventDefault();
        
        let f_data = new FormData(document.forms.gradeCalculatorForm)
        var modal = new bootstrap.Modal(document.getElementById("gradeCalculatorModel"),{})

        let return_value = undefined
        if(selectCourse.val() == "digital_marketing" || selectCourse.val() == "mechanical_engineering" || selectCourse.val() == "computer_information_system"){
            return_value = getEligibility(selectCourse.val(),f_data.get("math"),f_data.get("english"),f_data.get("physics"),f_data.get("chemistry"),f_data.get("biology") )
        }
        else{
            return_value = getEligibility(selectCourse.val(),f_data.get("math_literature"),f_data.get("english_literature"),f_data.get("business_studies"),f_data.get("echonomics"),f_data.get("physical_health_studies") )
        }

        if(return_value.type == "warning"){
            warningModal(return_value.message)
            modal.show()
        }
        else if(return_value.type == "success"){
            sucessgModal(return_value.message)
            modal.show()
        }
        else{
            failuregModal(return_value.message)
            modal.show()
        }

    })

})