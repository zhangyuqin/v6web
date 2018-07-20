(function(){
    $(function(){

        achieve_edu(function(data){
            createItems(data);
            //window.setTimeout(createItems(data),3000);
        });

        achieve_gov(function(data){
            creategov(data);
        });
        achieve_com(function(data){
            createcom(data);
        });

    });

    function achieve_edu(callback){
        $.ajax({
            url:'/edu/',
            type:'get',
            dataType:'json',
            success:function(data){
                var data = data.result;
                callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        });
    }

    function achieve_gov(callback){
        $.ajax({
            url:'/gov/',
            type:'get',
            dataType:'json',
            success:function(data){
                var data = data.result;
                callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        });
    }

    function achieve_com(callback){
        $.ajax({
            url:'/com/',
            type:'get',
            dataType:'json',
            success:function(data){
               var data = data.result;
               callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        });
    }
    function createcom(data){
        var html = '';
        for(var i = 0;i<data.length;i++){
            var dns = data[i].dns,
                domain = data[i].domain,
                mail = data[i].mail,
                org = data[i].org,
                url = data[i].url,
                web = data[i].web;  
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+web.result+'</td>'+
                            '<td class="'+mail.color+'">'+mail.result+'</td>'+
                            '<td class="'+dns.color+'">'+dns.result+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered normal-table">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title">域名</th>'+
                            '<th class="table-title">组织</th>'+
                            '<th class="table-title">Web</th>'+
                            '<th class="table-title">Mail</th>'+
                            '<th class="table-title" id="table-dns">DNS</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#commercial').html(dom);            
    }

    function creategov(data){
        var html = '';
        for(var i = 0;i<data.length;i++){
            var dns = data[i].dns,
                domain = data[i].domain,
                mail = data[i].mail,
                org = data[i].org,
                url = data[i].url,
                web = data[i].web;  
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+web.result+'</td>'+
                            '<td class="'+mail.color+'">'+mail.result+'</td>'+
                            '<td class="'+dns.color+'">'+dns.result+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered normal-table">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title">域名</th>'+
                            '<th class="table-title">组织</th>'+
                            '<th class="table-title">Web</th>'+
                            '<th class="table-title">Mail</th>'+
                            '<th class="table-title" id="table-dns">DNS</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#goverment').html(dom);            
    }
    function createItems(data){
        var html = '';
        for(var i = 0;i<data.length;i++){
            var dns = data[i].dns,
                domain = data[i].domain,
                mail = data[i].mail,
                org = data[i].org,
                url = data[i].url,
                web = data[i].web;  
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+web.result+'</td>'+
                            '<td class="'+mail.color+'">'+mail.result+'</td>'+
                            '<td class="'+dns.color+'">'+dns.result+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered normal-table">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title">域名</th>'+
                            '<th class="table-title">组织</th>'+
                            '<th class="table-title">Web</th>'+
                            '<th class="table-title">Mail</th>'+
                            '<th class="table-title" id="table-dns">DNS</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#university').html(dom);            
    }


})()