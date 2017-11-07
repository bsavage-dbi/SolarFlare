// jshint ignore: start
//Globar variable that controls the ID of each new row added to the redirect form
var redirect_row = 1;
var qa_row = 1;
var hash = `# `;
var path_to_url = true;
var sc_path = `/sitecore/content/`;
var author_path = `http://author.`;
var live_path = `https://www.`;

function init () {
  //handle any sort of initialization code here if necessary
  $("#resolution_tab").trigger('click');
}

// This functions handles the tabs and content within
function open_tab(tabName) {

    // Declare all variables
    var i, tabcontent, tablinks;
    var content = tabName + "_content";
    var tab_id  = '#' + tabName;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(content).style.display = "block";
    $(tab_id).addClass('active');
}

//This function pulls the values for the resolution steps form
function pull_values_for_resolution () {

  var action = $("#action").val();
  var description = $("#task").val();
  var note = $("#note").val().split('\n') || "N/A";
  var steps = $("#steps").val().split('\n');
  var paths = $("#paths").val();
  var subpath = $("#subpath").val() || "N/A";
  var notify  = $('#notify').val() || [];

  generate_resolution_steps(action, description, note, steps, paths, subpath, notify);
}

//This function pulls the values for the QA results form
function pull_values_for_qa_results () {

  // Pass and Fail Variables
  var ok = '(/)';
  var fail = '(x)';

  // TESTS
  var outcome = $("#outcome").val();
  var steps = $("#qa_steps").val().split('\n');
  var results = $("#qa_results").val().split('\n');
  var note = $("#qa_note").val().split('\n') || "N/A";
  var screenshot = $("#screenshot").val().split('\n') || "N/A";
  var environment = $("#environment").val();

  // ROUTINE CHECKS
  var check_metadata = $("#check_metadata").is(":checked") ? ok : fail;
  var check_urls = $("#check_urls").is(":checked") ? ok : fail;
  var check_images = $("#check_images").is(":checked") ? ok : fail;
  var check_links = $("#check_links").is(":checked") ? ok : fail;
  var check_videos = $("#check_videos").is(":checked") ? ok : fail;
  var check_downloads = $("#check_downloads").is(":checked") ? ok : fail;
  var check_language = $("#check_language").is(":checked") ? ok : fail;
  var check_cross_browsing = $("#check_cross_browsing").is(":checked") ? ok : fail;

  // BROWSER TESTS
  var check_chrome = $("#check_chrome").is(":checked") ? 'Chrome' :'';
  var check_ff = $("#check_ff").is(":checked") ? 'FF' :'';
  var check_ie = $("#check_ie").is(":checked") ? 'IE' :'';
  var notify  = $('#qa_notify').val() || [];

  generate_qa_steps(outcome, steps, results, note, screenshot, check_metadata, check_urls,
  check_images, check_links, check_videos, check_downloads, check_language, check_cross_browsing,
  environment, check_chrome, check_ff, check_ie, notify);
}

//This function pulls the values for the release forms
function pull_values_for_realease () {

  var content = $("#release_input").val().split('\n');
  var notify  = $('#release_notify').val() || [];
  var form_format = $("input:radio[name='release_radios']:checked").val();

  generate_release_forms(content, notify, form_format);
}

//This function pulls the values for the redirects forms
function pull_values_for_redirect () {

  var platform = $("#redirect_platform").val();
  var policy  = $("#policy_name").val();
  var redirect_version = $("#redirect_version").val();
  var notify  = $('#redirect_notify').val() || [];
  var note = $("#redirect_notes").val().split('\n') || "N/A";
  var redirect_origin = $('#redirect_origin').val().split('\n') || [];
  var redirect_destiny = $('#redirect_destiny').val().split('\n') || [];

  //var redirect_list = [];
  //Casi me pego un tiro haciendo esta funcion...
  // $.each($("#resolution_table > tbody  > tr > td"), function(){
  //   redirect_list.push($(this).find('input').val());
  // });

  //console.log(redirect_list);
  generate_redirect_forms(platform, policy, redirect_version, notify, note, redirect_origin, redirect_destiny);
}

//This function pulls the values for the A-team QA forms
function pull_values_for_a_team () {

  var type = "";
  var impact_list  = [];
  var impact_value = [];
  var check_list = [];
  var passed = $("#qa_passed").val();

  // Pass and Fail Variables
  var ok = '{color:green}OK!{color}';
  var fail = '{color:red}Failed!{color}';

  //Check template variables

  var doc_template = `- Documentation explains each field, contains Content Editor section and tells which text come from universal text or product catalog `;
  var new_page_template = `- Component verified on a new page `;
  var universal_template = `- Universal text verified `;
  var cta_template = `- CTA Links `;
  var product_template = `- Product Catalog `;
  var responsive_template = `- Responsiveness and in mobile view `;
  var translation_template = `- Translations `;
  var browser_template = `- All supported browsers `;

  // ROUTINE CHECKS
  if($("#check_documentation").val()){
    var check_documentation = $("#check_documentation").is(":checked") ? doc_template + ok : doc_template + fail;
    check_list.push(check_documentation);
  }
  if($("#check_new_page").val()){
    var check_new_page = $("#check_new_page").is(":checked") ? new_page_template + ok :new_page_template + fail;
    check_list.push(check_new_page);
  }
  if($("#check_universal").val()){
    var check_universal = $("#check_universal").is(":checked") ? universal_template + ok : universal_template + fail;
    check_list.push(check_universal);
  }
  if($("#check_cta").val()){
    var check_cta = $("#check_cta").is(":checked") ? cta_template + ok : cta_template + fail;
    check_list.push(check_cta);
  }
  if($("#check_product").val()){
    var check_product = $("#check_product").is(":checked") ? product_template + ok : product_template + fail;
    check_list.push(check_product);
  }
  if($("#check_responsive").val()){
    var check_responsive = $("#check_responsive").is(":checked") ? responsive_template + ok : responsive_template + fail;
    check_list.push(check_responsive);
  }
  if($("#check_translation").val()){
    var check_translation = $("#check_translation").is(":checked") ? translation_template + ok : translation_template + fail;
    check_list.push(check_translation);
  }
  if($("#check_browsers").val()){
    var check_browsers = $("#check_browsers").is(":checked") ? browser_template + ok : browser_template + fail;
    check_list.push(check_browsers);
  }
  
  // TEXTARE VARIABLES
  var example_pages = $("#qa_example_page").val();
  var found_issues = $("#found_issues").val().split('\n');
  var a_team_note = $("#a_team_note").val().split('\n') || "N/A";
  var qa_screenshot = $("#qa_screenshot").val().split('\n') || "N/A";

  var notify  = $('#a_team_notify').val() || [];

  $.each($("#impact_table > tbody  > tr > td.is_check"), function(){
    if($(this).find('input').is(":checked")){
      impact_value.push('{color:green}OK!{color}');
    }else{
      impact_value.push('{color:red}Failed!{color}');
    }
  });

  $.each($("#impact_table > tbody  > tr > td.expand_input"), function(){
    impact_list.push($(this).find('input').val());
  });

  generate_a_team_report(passed, check_list, example_pages, found_issues, a_team_note, notify, impact_list, impact_value, qa_screenshot);
}

//This function pulls the values for the release forms
function pull_values_for_bug () {

  var steps = $("#bug_steps").val();
  var current_result  = $("#bug_current_result").val();
  var expected_result = $("#bug_expected_result").val();
  var screenshot = $("#bug_screenshots").val().split('\n');
  var notify  = $('#bug_notify').val() || [];

  generate_bug_report(steps, current_result, expected_result, screenshot, notify);
}

//This function pulls the values to convert paths to urls o vice-versa
function pull_values_for_conversion(){
  var convert_input = $('#convert_input').val().split('\n');
  var url_format = $("input:radio[name='converter_radios']:checked").val();
  
  generate_conversion(convert_input, url_format);
}

//This function takes a set of variables and creates the JIRA resolution steps with them.
function generate_resolution_steps (action, description, note, steps, paths, subpath, notify) {

  resolution_steps =

  "h3. {panel:title=(on) *Ready for verification*|titleBGColor=#FFF7DF|titleColor=#292929}" + "\n" +
  "{panel}" + "\n" +
  "*What did we do?*" + "\n" +
  "* "+ action + " " + description + " as requested" + "\n" +
  "\n" +
  "h4." + "\n" +
  "{panel:title=*Notes*|borderStyle=ridge|borderColor=#FFDF80|titleBGColor=#FFDF80|bgColor=#FFF7DF|titleColor=#FF0000}" + "\n";

  for (var i = 0, l = note.length; i < l; i++ ) {
    note[i].trim() ? resolution_steps += "* " + note[i] + `\n` : resolution_steps +=`\n`;
  }

  resolution_steps +=
  "{panel}"  + "\n" +
  "{panel:title=Testing Instructions|borderStyle=double|borderColor=#ccc|titleBGColor=#008EBA|bgColor=#F5F5F5|titleColor=#ffffff}" + "\n";

  for (var i = 0, l = steps.length; i < l; i++ ) {
    steps[i].trim() ? resolution_steps += "# " + steps[i] + `\n` : resolution_steps +=`\n`;
  }

  resolution_steps +=
  "{panel}"   + "\n" +
  "\\\\" + "\n" +
  "{panel:title=SC Paths|borderStyle=solid|borderColor=#F8F8FF|titleBGColor=#C1CDCD|bgColor=#F8F8FF|titleColor=#292929}"  + "\n" +
  "h6. *Path(s) to be submitted*"  + "\n" +
  "{quote}"     + "\n" +
   paths        + "\n" +
  "{quote}"     + "\n" +
  "h6. *Path(s) also affected*"  + "\n" +
  "{quote}"     + "\n" +
   subpath  + "\n" +
  "{quote}"     + "\n" +
  "{panel}"   + "\n" +
  "*FYI*" + "\n" +
   notify;

  copy_to_clipboard(resolution_steps)
}

//This function takes a set of variables and creates the JIRA QA steps with them.
function generate_qa_steps(outcome, steps, results, note, screenshot, check_metadata, check_urls,
  check_images, check_links, check_videos, check_downloads, check_language, check_cross_browsing,
  environment, check_chrome, check_ff, check_ie, notify) {

  qa_results =

  "{panel:title=*QA Testing Results*|borderStyle=double|borderColor=#F4E8FF|titleBGColor=#9966CC|bgColor=#FFFFFF|titleColor=#FFFFFF}" + "\n" +
  "h3. {color:#292929}*OUTCOME*{color}" + "\n" +
  "h4. " + outcome + "\n" + " " + "\n" +

  "----" + "\n" +
  "h3. Replication Steps" + "\n";
  for (var i = 0, l = steps.length; i < l; i++ ) {
    steps[i].trim() ? qa_results += "# " + steps[i] + `\n` : qa_results +=`\n`;
  }

  qa_results += " " + "\n" +

  "h3. Results"  + "\n";
  for (var i = 0, l = results.length; i < l; i++ ) {
    results[i].trim() ? qa_results += "* " + results[i] + `\n` : qa_results +=`\n`;
  }

  qa_results += " " + "\n" +

  "h3. Notes" + "\n";
  for (var i = 0, l = note.length; i < l; i++ ) {
    note[i].trim() ? qa_results += "* " + note[i] + `\n` : qa_results +=`\n`;
  }

   qa_results += " " + "\n" +

  "h3. Screenshots" + "\n";
  if(screenshot){
    for (var i = 0, l = screenshot.length; i < l; i++ ) {
      screenshot[i].trim() ? qa_results += `* !` + screenshot[i] + `.png|thumbnail!` + `\n`: qa_results +=`\n`;
    }      
  }

  qa_results += 

  " " + "\n" +
  "h3. Routine Checks" + "\n" +
   "* Metadata (<title>, SiteCatalyst, description): " + check_metadata + "\n" +
   "* URLs: " + check_urls + "\n" +
   "* Images display properly: " + check_images + "\n" +
   "* All links operational: " + check_links + "\n" +
   "* Videos playable: " + check_videos + "\n" +
   "* Download Buttons: " + check_downloads + "\n" +
   "* Language consistency: " + check_language + "\n" +
   "* Cross Browsing: " + check_cross_browsing + "\n" + " " + "\n" +

  "h3. Environment"  + "\n" +
  "* " + environment + "\n" + " " + "\n" +

  "h3. Browsers tested" + "\n" +
  "* " + check_chrome + ", " + check_ff + ", " + check_ie + "\n" +

  "{panel}" + "\n" +
  "h4. FYI" + "\n" +
  notify;

  copy_to_clipboard(qa_results)
}

//This function takes a set of variables and creates the JIRA workbox, release, live and note forms with them.
function generate_release_forms(content, notify, form_format){

  var release_form ="";

  if (form_format == "is_work"){
    release_form =
      "{panel:title=*Submitted to Workbox*|borderStyle=double|borderColor=#ccc|titleBGColor=#999933|bgColor=#FFFFFF|titleColor=#FFF}"  + "\n" +
      "h6. SC Path"  + "\n" +
      "{quote}"  + "\n";
      for (var i = 0, l = content.length; i < l; i++ ) {
        content[i].trim() ? release_form += content[i] + `\n` : release_form +=`\n`;
      }
      release_form +=
      "{quote}"  + "\n" +
      "{panel}"  + "\n" +
      "*FYI*"  + "\n" +
       notify;
  }

  if (form_format == "is_publish"){
    release_form =
      "{panel:title=*Published*|borderStyle=double|borderColor=#ccc|titleBGColor=#9ACD32|bgColor=#F5FFFA|titleColor=#292929}"  + "\n" +
      "h6. SC Path"  + "\n" +
      "{quote}"  + "\n";
      for (var i = 0, l = content.length; i < l; i++ ) {
        content[i].trim() ? release_form += content[i] + `\n` : release_form +=`\n`;
      }
      release_form +=
      "{quote}"  + "\n" +
      "{panel}"  + "\n" +
      "*FYI*"  + "\n" +
       notify;
  }

  if (form_format == "is_live"){
    release_form =
      "{panel:title=*Live*|titleBGColor=#00712B|titleColor=#ffffff}"  + "\n" +
      "h6. URL"  + "\n" +
      "{quote}"  + "\n";
      for (var i = 0, l = content.length; i < l; i++ ) {
        content[i].trim() ? release_form += content[i] + `\n` : release_form +=`\n`;
      }
      release_form +=
      "{quote}"  + "\n" +
      "{panel}"  + "\n" + " " + "\n" +
      "*FYI*"  + "\n" +
       notify;
  }

  if (form_format == "is_note"){
    release_form =
      "{panel:title=(!) *ATTENTION*|titleBGColor=#FFFFCC|titleColor=#FF3300}"   + "\n";
      for (var i = 0, l = content.length; i < l; i++ ) {
        content[i].trim() ? release_form += `h6. ` + content[i] + `\n` : release_form +=`\n`;
      }
      release_form +=
      "{panel}"   + "\n" +
      "*FYI*"     + "\n" +
       notify;
  }

  copy_to_clipboard(release_form);
}

//This function takes a set of variables and creates the JIRA redirect forms with them.
//Here I use a tortoise-and-hare algorithm, where you have two pointers at the head of the linked list, 
//one traverses the list two nodes at a time, and one traverses the list one node at a time; 
//if ever the pointers point to the same node, you have a cycle somewhere.
function generate_redirect_forms(platform, policy, redirect_version, notify, note, redirect_origin, redirect_destiny){

  //var j = 1;
  var redirect_form = 

    `h3. {panel:title=(on) *Ready for verification*|titleBGColor=#FFCEB8|titleColor=#292929}`  + `\n` +
    `{panel}`  + `\n` + ` ` + `\n` +
     
    `h4. Redirect platform`  + `\n` +
    `* ` + platform  + `\n` + ` ` + `\n` +
     
    `h4. Policy Name and Version`  + `\n` +
    `* ` + policy  + ` ` + `v` + redirect_version + `\n` + ` ` + `\n` +
     
    `\\\\`  + `\n` +
    `|| From || To ||` + `\n`;

    // Los redirects vienen en pares ordenados por ello los contadores j,i deben siempre de seguir
    // un crecimiento lineal de x = n + 2
    // for ( var i = 0, l = redirect_list.length; i < l; i++ ) {
    //     redirect_form += `| ` + redirect_list[i] + ` | ` + redirect_list[j] + ` |`  + `\n`;
    //     j += 2;
    //     i += 1;
    // }

    for (var i = 0, l = redirect_origin.length; i < l; i++ ) {
      redirect_form += `| ` + redirect_origin[i] + ` | ` + redirect_destiny[i] + ` |`  + `\n`;
    }

    redirect_form += 
    ` ` + `\n` +
    `h4. {color:red}Notes{color}`  + `\n`;
 
    for (var i = 0, l = note.length; i < l; i++ ) {
      note[i].trim() ? redirect_form += `* ` + note[i] + `\n` : redirect_form +=`\n`;
    }

    redirect_form += 
    ` ` + `\n` +
    `*FYI*`  + `\n` +
     notify;

  copy_to_clipboard(redirect_form);
}

//This function takes a set of variables and creates a bug report with them.
function generate_bug_report(steps, current_result, expected_result, screenshot, notify){

  var bug_report =

  `h3. Steps to Replicate:` + `\n` +
    steps + `\n` + ` ` + `\n` +

  `h3. Current Results.` + `\n` +
      `# {color:red}` + current_result + `{color}` + `\n` + ` ` + `\n` +

  `h2. {color:green}Expected Results:{color}` + `\n` +
      `# ` + expected_result + `\n` + ` ` + `\n` +

  `h3. See attached Screenshots` + `\n`;
  if(screenshot){
    for (var i = 0, l = screenshot.length; i < l; i++ ) {
      screenshot[i].trim() ? bug_report += `* !` + screenshot[i] + `.png|thumbnail!` + `\n`: bug_report +=`\n`;
    }      
  }
 
    bug_report +=
    ` ` + `\n` +
    `*FYI*`  + `\n` + ` ` + `\n` +
     notify;

  copy_to_clipboard(bug_report);
}

//This function takes a set of variables and creates the A-Team QA template with them.
function generate_a_team_report(qa_passed, check_list, example_pages, found_issues, a_team_note, notify, impact_list, impact_value, qa_screenshot) {
    var a_team_form =

    `h3. Verification Results` + `\n` + ` ` + `\n` +

    `*Status*` + `\n` + ` ` + `\n` +

    `- QA Passed ` + qa_passed + `\n` + ` ` + `\n` +

    `*Component*` + `\n` + ` ` + `\n`;

    for ( var i = 0, l = check_list.length; i < l; i++ ) {
      a_team_form +=  check_list[i] + `\n`;
    }

    a_team_form +=

    ` ` + `\n` +
    `*Tested Impact*` + `\n` + ` ` + `\n`;

      for ( var i = 0, l = impact_list.length; i < l; i++ ) {
        a_team_form +=  `-  ` + impact_list[i] + " " + impact_value[i] + `\n`;
      }

    a_team_form +=
    ` ` + `\n` +

    `*Tested Example pages*` + `\n` +
      example_pages + `\n` + ` ` + `\n` +

    `*Found Issues*` + `\n` + ` ` + `\n`;

    for (var i = 0, l = found_issues.length; i < l; i++ ) {
      found_issues[i].trim() ? a_team_form += `- ` + found_issues[i] + `\n` : a_team_form +=`\n`;
    }

    if(qa_screenshot){
      for (var i = 0, l = qa_screenshot.length; i < l; i++ ) {
        qa_screenshot[i].trim() ? a_team_form += `* !` + qa_screenshot[i] + `.png|thumbnail!` + `\n`: a_team_form +=`\n`;
      }      
    }

     a_team_form +=

     `\n` + ` ` + `\n` +
     notify + `\n` + ` ` + `\n`;

    for (var i = 0, l = a_team_note.length; i < l; i++ ) {
      a_team_note[i].trim() ? a_team_form += `* ` + a_team_note[i] + `\n` : a_team_form +=`\n`;
    }

    copy_to_clipboard(a_team_form);
}

//This function takes a set of urls and transform them to paths or vice-versa.
function generate_conversion(convert_input, url_format){

  item_list = [];
  var plain_list = '';
  var new_url = '';
  var url_base = '';
  var expr_slash = /\//;

  //Generates PATH 2 Author
  if(path_to_url && url_format == 'author'){
    $.each(convert_input, function(index, item) {
      if(item){
        new_url  = item.replace("/sitecore/content/", '')
        url_base = new_url.split(/\/(.+)/)[1];
        new_url  = new_url.replace(url_base, '')

        if(expr_slash.test(new_url)){
          new_url = author_path + new_url.replace('/', '.com/');
        }else{
          new_url = author_path + new_url + '.com/';
        }

        new_url = new_url.toLowerCase();
        //Check if the paths V2 syntax and act accordinly 
        if (/swdcv2/i.test(new_url)){
          new_url = new_url.replace('swdcv2', 'solarwinds');
        }

        url_base ? url_base = url_base.trim().replace(/\s/g, '-') : url_base = '';
        new_url  =  new_url + url_base;
        item_list.push(new_url);
        }
    });
  }

  //Generates PATH 2 Live
  if(path_to_url && url_format == 'live'){
    $.each(convert_input, function(index, item) {
      if(item){
        new_url  = item.replace("/sitecore/content/", '')
        url_base = new_url.split(/\/(.+)/)[1];
        new_url  = new_url.replace(url_base, '')

        if(expr_slash.test(new_url)){
          new_url = live_path + new_url.replace('/', '.com/');
        }else{
          new_url = live_path + new_url + '.com/';
        }

        new_url = new_url.toLowerCase();
        //Check if the paths V2 syntax and act accordinly 
        if (/swdcv2/i.test(new_url)){
          new_url = new_url.replace('swdcv2', 'solarwinds');
        }

        url_base ? url_base = url_base.trim().replace(/\s/g, '-') : url_base = '';
        new_url  =  new_url + url_base;
        item_list.push(new_url);
      }
    });
  }

  //Generates AUTHOR 2 Path
  if(!path_to_url && url_format == 'author'){
    $.each(convert_input, function(index, item) {

      if(item){
        new_url = new URL(item);
        //Check if the URLs contains solarwind as a hostname, if it does replace it for v2's path syntax
        if (/solarwinds/i.test(new_url)){
          new_url.hostname = new_url.hostname.replace('solarwinds', 'SWDCv2');
          //If the item is a resource add the correct path containing global
          if (/resources/i.test(new_url.pathname)){
            new_url.hostname = new_url.hostname.replace('swdcv2', 'global');
          }
        }
        if (/serv-u/i.test(new_url)){
          new_url.hostname = new_url.hostname.replace('serv-u', 'ServU');
        }
        item_list.push(sc_path + new_url.host.replace(/author\.|\.com/gi, '') + new_url.pathname.replace(/-/g, ' '));
      }
    });
  }

  //Generates LIVE 2 Path
  if(!path_to_url && url_format == 'live'){
    $.each(convert_input, function(index, item) {
      if(item){ 
        new_url = new URL(item);
        //Check if the URLs contains solarwind as a hostname, if it does replace it for v2's path syntax
        if (/solarwinds/i.test(new_url)){
          new_url.hostname = new_url.hostname.replace('solarwinds', 'SWDCv2');
          //If the item is a resource add the correct path containing global
          if (/resources/i.test(new_url.pathname)){
            new_url.hostname = new_url.hostname.replace('swdcv2', 'global');
          }
        }
        if (/serv-u/i.test(new_url)){
          new_url.hostname = new_url.hostname.replace('serv-u', 'ServU');
        }
        item_list.push(sc_path + new_url.host.replace(/www\.|\.com/gi, '') + new_url.pathname.replace(/-/g, ' '));
      }
    });
  }
  
  $.each(item_list, function(index, item) {
    plain_list += item_list[index]  + `\n`
  });

  copy_to_clipboard(plain_list);
}

//This function copies a text result from the generate_ functions to the user's clipboard.
function copy_to_clipboard (text) {

  console.log(text);

  var dummy = $('<textarea>').val(text).appendTo('body').select()
  document.execCommand('copy')
  dummy.remove();
}

//This function resets the forms and sends the user back to the resolution form
function clear_tab () {
  //var current_tab = $(this).closest(".head-div").attr("id");
  //console.log('Mr.Risseti');
  $(".reset").click(function() {
      $(this).closest('form').find("input[type=text], textarea").val("");
  });
  redirect_row = 1;
  qa_row = 1;
  //open_tab(current_tab);
}

//This function add a new row to the table in the redirects form
function add_new_redirect_row (){
  var row =
    '<tr>' +
      '<td class="keyvalue"><input id="redirect_from_' + redirect_row + '"' + 'name="task" type="text" placeholder="Redirects from..." class="form-control input-md"></td>' +
      '<td class="keyvalue"><input id="redirect_to_' + redirect_row + '"'   + 'name="task" type="text" placeholder="Redirects to..." class="form-control input-md"></td>' +
    '</tr>';
  redirect_row++;
  //console.log(redirect_row);
  $("#resolution_table").append(row);
}

//This function add a new row to the table in the redirects form
function add_new_add_qa_row (){
  var row =
    `<tr>` +
      `<td class="impact_value  is_check"><input type="checkbox" name="tested_impact" id="check_impact_` + qa_row + `"` + `checked="checked"></td>` +
      `<td class="impact_value expand_input"><input id="tested_impact_` + qa_row + `"` + `name="task" type="text" placeholder="Tested on..." class="form-control input-md"></td>` +
    `</tr>`;
  qa_row++;
  //console.log(redirect_row);
  $("#impact_table").append(row);
}

function clear_converter(){
  event.preventDefault();
  $('#convert_input').val('');
  $('#convert_output').val('');
}

function swap_converter(){
  event.preventDefault();
  if(path_to_url){
    $("label[for='convert_input']").text("Input Url(s)");
    $("#converter_name").text("URL to Path Converter");
    // $("label[for='converter_radios']").text("Generate URL(s) for");
    path_to_url = false;
  }else{
    console.log('url to path');
    $("label[for='convert_input']").text("Input Path(s)");
    $("#converter_name").text("Path to URL Converter");
    // $("label[for='converter_radios']").text("Generate Path(s) from");
    path_to_url = true;
  }
}

function remove_element(){
  $('.btn-remove-row').on('click',function () {
        $(this).parent().remove();   
    });
}


//bind event handlers
document.addEventListener('DOMContentLoaded', init);

//binds event to resolution tab click
document.querySelector('button#resolution_tab').addEventListener('click', open_tab.bind(this,'resolution_tab'));

//binds event to qa tab click
document.querySelector('button#qa_tab').addEventListener('click', open_tab.bind(this,'qa_tab'));

//binds event to release tab click
document.querySelector('button#release_tab').addEventListener('click', open_tab.bind(this,'release_tab'));

//binds event to redirect tab click
document.querySelector('button#redirect_tab').addEventListener('click', open_tab.bind(this,'redirect_tab'));

//binds event to QA verification tab click
document.querySelector('button#qa_verification_tab').addEventListener('click', open_tab.bind(this,'qa_verification_tab'));

//binds event to Bug Report tab click
document.querySelector('button#bug_report_tab').addEventListener('click', open_tab.bind(this,'bug_report_tab'));

//binds event to Bug Report tab click
document.querySelector('button#path_converter_tab').addEventListener('click', open_tab.bind(this,'path_converter_tab'));

//binds event to add new row button click
//document.querySelector('button#add_row').addEventListener('click', add_new_redirect_row.bind(this,'add_row'));

//binds event to new QA row button click
document.querySelector('button#add_qa_row').addEventListener('click', add_new_add_qa_row.bind(this,'add_row'));

//REFACTOR THIS LATER THROWING ERROR ON RESOLUTION
document.querySelector('button#clear').addEventListener('click', clear_tab);

//Removes a row from the the QA-A team form.
$('.btn-remove-row').on('click',function () {
    $(this).parent().remove();   
});

//Restes the conversion tab to its default stage
document.querySelector('button#clear_converter').addEventListener('click', clear_converter);

document.querySelector('button#submit_resolution').addEventListener('click', pull_values_for_resolution);
document.querySelector('button#submit_quality_assurance').addEventListener('click', pull_values_for_qa_results);
document.querySelector('button#submit_release_form').addEventListener('click', pull_values_for_realease);
document.querySelector('button#submit_redirect_form').addEventListener('click', pull_values_for_redirect);
document.querySelector('button#submit_bug_report').addEventListener('click', pull_values_for_bug);
document.querySelector('button#submit_a_team_qa').addEventListener('click', pull_values_for_a_team);
document.querySelector('button#submit_path_convert').addEventListener('click', pull_values_for_conversion);
document.querySelector('button#swap_converter').addEventListener('click', swap_converter);