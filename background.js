
var N_Pack = 0; var I_Class = 0; var I_methods = 0;
var N_class = 0; var N_methods = 0; var D_Pack = 0;
var java_array = []; var iterator = 0;
var server_busy = false;
class Queue 
{ 
    constructor() 
    { 
        var it = 0;
        this.items = []; 
    } 
    push(element) 
    { 
    this.items.push(element); 
    } 
    pop() 
    { 
    if(this.isEmpty()) 
        return "Underflow"; 
    this.items.shift(); 
    } 
    front() 
    { 
    if(this.isEmpty()) 
        return "No elements in Queue"; 
    return this.items[it]; 
    } 
    isEmpty() 
    {  
    return (this.items.length == 0); 
    } 
    size()
    {
    return this.items.length;
    }
    printQueue() 
    { 
     for(var i = 0; i < this.items.length; i++) 
        console.log(this.items[i]);  
    } 
} 
  var queue = new Queue(); 
  var flag = false;
  var code = "";
function loadDoc(str1,bool_flag) {

    document.body.style.background = "#323232";
    var xhttp = new XMLHttpRequest();
    xhttp.withCredentials = true;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var doop = []; 
        doop = JSON.parse(this.responseText).message;
        var i;
        for(i=0;i<doop.length;i++)
        {
          queue.push(doop[i]);
          console.log(doop[i]);
        }
        if(bool_flag || str1.includes("."))
        {
            if(str1.includes("."))
            {
                var need_arr = str1.split("/");
                var need_arr2 = need_arr[need_arr.length - 1].split(".");
                java_array[iterator] = need_arr2[0];
                iterator++;
            }
           var i;
         if(doop.length >= 1)
         code +=  "https://github.com/" + str1 + "\n" ;
         for(i=0;i<doop.length;i++)
         {
         code += doop[i] + "\n" ;
         }
          if(doop.length >= 1)
             code +=  "<br/>--------------------<br/>"; 
       }
        else
        {
            
        for(i=0;i<doop.length;i++)
        {
           if(doop[i].includes("."))
           {
              if(str1.includes(global_master))
              {
                loadDoc( str1 + "/" + doop[i],true);
              }
             
              else
              loadDoc( str1 + "/blob/" + global_master + "/" + doop[i],true);
           }
           else
           {
            if(str1.includes(global_master))
              loadDoc( str1 + "/" + doop[i],false);
            else
            loadDoc( str1 + "/tree/" + global_master + "/" + doop[i],false);
           }
        }
            
         
        
       
        }
        
        
      }
      else if(this.status == 303)
      {
        server_busy = true;
      }
    };
    xhttp.withCredentials = false;
    xhttp.open("POST", "https://morning-brook-40296.herokuapp.com", false);
    xhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded")
    var str = str1;
    console.log(str);
    xhttp.send('link='+str);
   
  }
function myFunct(arr)
{
                   console.log(arr);
                    var i = 0;
                    var pack = []; var p = 0;
                    var syn_class = []; var s = 0;
                    var inh_class = []; var inh = 0;
                    var methods = [];   var m = 0;
                    var overrides = 0;
                    var line;var words;var j = 0;
                    for(i=0;i<arr.length;i++)
                    {
                        line = arr[i];
                        words = line.split(' ');
                        for(j=0;j<words.length;j++)
                        {
                            if(words[j] == ' ')
                                continue;
                            else
                            {
                                if(words[j] == "@override")
                                {
                                    overrides++;
                                }
                                else if(words[j] == "import" || words[j] == "package")
                                {
                                    j++;
                                    while(words[j] == ' ')
                                    {
                                        j++;
                                    }
                                    var tmp_it = 0;
                                    for(tmp_it=0;tmp_it<iterator;tmp_it++)
                                    {
                                        var list_sep0 = words[j].split(";");
                                        list_sep = list_sep0[0].split(".");
                                        var cmp_item;
                                        if(list_sep.length == 0)
                                        {
                                            cmp_item = list_sep;
                                        }
                                        else{
                                            cmp_item = list_sep[0];
                                        }
                                        if(cmp_item == java_array[tmp_it])
                                        {
                                            D_Pack  = D_Pack + 1;
                                        }
                                    }
                                    var tmp = 0;
                                    var tmp_flag = false;
                                    for(tmp=0;tmp<p;tmp++)
                                    {
                                        if(pack[tmp] == words[j])
                                        {
                                            tmp_flag = true;
                                            break;
                                        }
                                        
                                    }
                                    if(tmp_flag == false)
                                    {
                                        pack[p] = words[j];
                                        p++;
                                    }  
                                    j--;
                                }
                                else if(words[j] == "class")
                                {
                                    j++;
                                    while(words[j] == ' ')
                                    {
                                        j++;
                                    }
                                    var rt = 0;
                                    var fg = false;
                                    if(s>0)
                                    for(rt=0;rt<s;rt++)
                                    {
                                        if(syn_class[rt] == words[j])
                                        {
                                          fg = true;
                                          break;
                                        }
                                    }
                                    if(!fg)
                                    {
                                        syn_class[s] = words[j];
                                        s++;
                                    }
                                    j--;
                                }
                                else if(words[j] == "extends")
                                {
                                    var rt = 0;
                                    var fg = false;
                                    if(inh>0)
                                    for(rt=0;rt<inh;rt++)
                                    {
                                        if(inh_class[rt] == words[j+1])
                                        {
                                          fg = true;
                                          break;
                                        }
                                    }
                                    if(!fg)
                                    {
                                    inh_class[inh] = words[j+1];
                                    inh++;
                                    }
                                    j++;
                                }
                                else if(words[j] == "void"
                                || words[j] == "int"
                                || words[j] == "int*"
                                || words[j] == "char"
                                || words[j] == "char*"
                                || words[j] == "float"
                                || words[j] == "float*"
                                || words[j] == "double"
                                || words[j] == "double*"
                                || words[j] == "short"
                                || words[j] == "short*"
                                || words[j] == "byte"
                                || words[j] == "byte*"
                                || words[j] == "boolean"
                                || words[j] == "string"
                                )
                                {
                                    
                                    j++;
                                    while(words[j] == ' ')
                                    {
                                        j++;
                                    }
                                    var temp = words[j].split('(');
                                    var tm = temp.length;
                                    if(tm>1)
                                    {
                                    var rt = 0;
                                    var fg = false;
                                    if(m>0)
                                    for(rt=0;rt<m;rt++)
                                    {
                                        if(methods[rt] == words[j])
                                        {
                                          fg = true;
                                          break;
                                        }
                                    }
                                    if(!fg)
                                    {
                                    methods[m] = temp[0];
                                    m++;
                                    } 
                                    }
                                    
                                    
                                    j--;
                                }
                                else if(words[j].includes("System") || words[j].includes("if") || words[j].includes("while") || words[j].includes("do") || words[j].includes("for"))
                                {
                                    break;
                                }
                                else
                                {
                                    continue;
                                }
                            }
                        }
                    }
                    
                   
                    
                    
                    var ans;
                    code +=  "Package:<br/>--------------<br/>";
                    
                    for(i=0;i<p;i++)
                    {
                        ans = pack[i].split(';');
                        code +=  ans[0];
                      
                        code +=  "<br/>";
                    }
                    code +=  "Number of Packages: ";
                    code +=  p;
                    code +=  "<br/>--------------<br/>";
                    var tot =  inh + s;
                    code +=   "Classes Used: ( Total = ";
                    code +=  tot;
                    code +=  " )<br/>";
                    
                    code +=   "1)Inherited Classes ( ";
                    code += inh ;
                    code += " ):<br/>";
                   
                    for(i=0;i<inh;i++)
                    {
                        ans = inh_class[i];
                        var ans2 = ans.split('{');
                        if(ans2.length > 1)
                        {
                            code +=  ans2[0];    
                        }
                        else{
                            code +=  ans;
                    
                        }
                        
                        code +=   "<br/>";
                      
                    }
                    code +=   "2)Non-inherited Classes ( " ;
                    code +=  s ;
                    code +=  " ):<br/>";
                   
                    for(i=0;i<s;i++)
                    {
                        var ans;
                        ans = syn_class[i];
                        var ans2 = syn_class[i].split('{');
                        if(ans2.length > 1)
                        {
                            code +=  ans2[0];    
                        }
                        else{
                             code +=  syn_class[i];
                    
                        }
                        
                         code +=    "<br/>";
                        
                    }
                    code +=   "----------------<br/>Number of Methods: ( Total = " ;
                    code +=  m ;
                    code +=  " )<br/>";
                   
                    for(i=0;i<m;i++)
                    {
                        ans = methods[i];
                     code +=    ans;
                       
                         code +=    "<br/>";
                        
                    }
                     code +=    "Num of Overrided Methods ( ";
                     code +=   overrides ;
                     code +=  " ):<br/>";
                    var non_over = m - overrides;
                     code +=    "Non-Overrided methods ( " ;
                     code +=  non_over ;
                     code +=  " ):<br/>";
                     code += '<button  style=" background: #4CAF50;color: white;border: 0px;border-radius: 0.5rem;padding-top: 1rem;padding-bottom: 1rem;padding-left: 0.5rem;padding-right: 0.5rem;">Packages<span class="badge" style="margin-left:0.5rem;background:darkorange;margin-right:0.5rem;">'
                                                                   + p +
                                                                   '</span></button><button  style=" background:#f4511e;color: white;border: 0px;border-radius: 0.5rem;padding-top: 1rem;padding-bottom: 1rem;padding-left: 0.5rem;padding-right: 0.5rem;">Inherited Methods<span class="badge" style="margin-left:0.5rem;background:darkorange;margin-right:0.5rem;">'
                                                                   + inh + 
                                                                   '</span></button><button  style=" background:blue;color: white;border: 0px;border-radius: 0.5rem;padding-top: 1rem;padding-bottom: 1rem;padding-left: 0.5rem;padding-right: 0.5rem;">Non Inherited Methods<span class="badge" style="margin-left:0.5rem;background:darkorange;margin-right:0.5rem;">'
                                                                   + s +
                                                                   '</span></button><button  style=" background:darkorchid;color: white;border: 0px;border-radius: 0.5rem;padding-top: 1rem;padding-bottom: 1rem;padding-left: 0.5rem;padding-right: 0.5rem;">Overriding Methods<span class="badge" style="margin-left:0.5rem;background:darkorange;margin-right:0.5rem;">'
                                                                   + overrides +
                                                                   '</span></button><button  style=" background:#555555;color: white;border: 0px;border-radius: 0.5rem;padding-top: 1rem;padding-bottom: 1rem;padding-left: 0.5rem;padding-right: 0.5rem;">Non Overriding Methods<span class="badge" style="margin-left:0.5rem;background:darkorange;margin-right:0.5rem;">'
                                                                   + non_over +
                                                                   '</span></button>';
                    
                    N_Pack += p;
                    I_Class += inh;
                    I_methods += overrides;
                    N_class += I_Class + s;
                    N_methods += I_methods + non_over;  
}


  function fun_code1(){
    
    var check2 = document.body.innerText.split("\n");
    var ch2;
    for(ch2=0;ch2<check2.length;ch2++)
    {
        if(check2[ch2].includes("Branch:") == true)
        {
            var tmp = check2[ch2].split(" ");
            global_master = tmp[1];
            break;
        }
    }
    console.log("branch: " + global_master);
     url_string = window.location.href;
     var url2_string = "";
     var i;
     for(i=19;i<url_string.length-1;i++)
     {
         url2_string += url_string[i];
     } 
     if(url_string[url_string.length-1] != "/")
     {
        url2_string += url_string[url_string.length-1];
     }
    loadDoc(url2_string,false);
   var matr = code.split('--------------------');
         var t = 0;
        for(t=0;t<matr.length-1;t++)
        {
         myFunct(matr[t].split('\n'));
         }
         document.body.style.background = "#ffffff";
         var badges_final = '<div style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);background: #FFFFFF;transition: 0.3s;margin-left:0.5rem;margin-right:0.5rem;"><button style="display: block;border-radius: 4px;background-color: #f6f6f6;border: none;color: #456FFF;text-align: center;font-size: 2.1rem;padding: 1rem;transition: all 0.5s;cursor: pointer;margin-top: 1rem;margin-bottom: 2rem;width:fit-content;text-align: center;width: 100%;font-family: \'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif;">GitQ Assessment Report<span style="color:red;" id="busy_tag">  </span></button><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:3rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">Total Number of Packages</p><p id="f11" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #4ec820;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:1rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">Total Number of Classes</p><p id="f22" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #d6ae22;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:1rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">Total Number of Methods</p><p id="f33" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #1182c3;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><br/><br/><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:3rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">File Dependency (Packages)</p><p id="f1" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #4ec820;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:1rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">Inheritence Level of Classes</p><p id="f2" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #d6ae22;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><button style="border: 0px;padding: 0px;border-radius: 0.2rem;margin-left:1rem;"><p style="color: white;border-radius: 0.2rem 0rem 0rem 0.2rem;background: #505050;display: inline;font-size: medium;padding-left: 0.5rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 0.5rem;border: 0px;margin-right: 0px;">Inheritence Level of Methods</p><p id="f3" style="border-radius: 0rem 0.2rem 0.2rem 0rem;background: #1182c3;display: inline;font-size: medium;padding-left: 1rem;padding-top: 0.2rem;padding-bottom: 0.2rem;padding-right: 1rem;border: 0px;margin-left: 0px;color: white;">0</p></button><p style="padding-left: 3rem;margin-top: 3rem;margin-bottom: 5rem;border-bottom-color: #505050;border-bottom-width: 0.5rem;font-family:\'Lucida Sans\', \'Lucida Sans Regular\', \'Lucida Grande\', \'Lucida Sans Unicode\', Geneva, Verdana, sans-serif;color: #999999;font-size: 18px;margin-bottom: 3rem;">Visual Q\'s for<span style="color:black;font-family: AvenirNext,Microsoft YaHei;font-size: 18px;"> JAVA </span>repositories on Github</p></div>';
         
         document.body.innerHTML = entire_code + badges_final;
         document.getElementById("f1").innerHTML =  D_Pack;
         document.getElementById("f2").innerHTML =  I_Class;
         document.getElementById("f3").innerHTML =  I_methods;
         document.getElementById("f11").innerHTML =  N_Pack;
         document.getElementById("f22").innerHTML =  N_class;
         document.getElementById("f33").innerHTML =  N_methods;
         if(server_busy == true)
         {
            document.getElementById("f1").innerHTML =  "-";
            document.getElementById("f2").innerHTML =  "-";
            document.getElementById("f3").innerHTML =  "-";
            document.getElementById("f11").innerHTML =  "-";
            document.getElementById("f22").innerHTML =  "-";
            document.getElementById("f33").innerHTML =  "-";
             document.getElementById("busy_tag").innerHTML = " Server Busy!! ";
         }
 }

 var entire_code = document.body.innerHTML;
 var global_master;
 fun_code1();
