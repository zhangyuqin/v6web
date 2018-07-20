(function(){
    var arraymap = [];

    $(function(){
       /* $('.right-map').click(function(){
            window.location.href='global';
        });*/

        $(document).on('click','.table',function(){
            var hname = $(this).attr('name');
            if(hname){
                window.location.href=hname;
            }  
        });

        //商业，高校，政府网站测试结果
        achieve_edu(function(data){
            createItems(data);
            window.setInterval(createItems,3000,data);
        });

        achieve_gov(function(data){
            creategov(data);
            window.setInterval(creategov,4000,data);
        });
        achieve_com(function(data){
            createcom(data);
            window.setInterval(createcom,5000,data);
        });

        //获取IPv6地址块
        achieve_v6block(function(data){
            createblock(data);
        });
        //IPv6用户数量top10
        achieve_user();

        //IPv6内容数量
        achieve_content();
        //IPv6宣告路由

        achieve_allocation();

        console.log(arraymap);
    });
    //setInterval 函数带参数
    var __sto = setInterval;     
    window.setInterval = function(callback,timeout,param){     
        var args = Array.prototype.slice.call(arguments,2);     
        var _cb = function(){     
            callback.apply(null,args);     
        }     
        __sto(_cb,timeout);     
    }
    function achieve_edu(callback){
        $.ajax({
            url:'edu/',
            type:'get',
            dataType:'json',
            success:function(data){
                var data = data.result;
                console.log(data);
                callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        });
    }

    function achieve_gov(callback){
        $.ajax({
            url:'gov/',
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(data.result);
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
            url:'com/',
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(data.result);
                var data = data.result;
                callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        });
    }

    //获取IPv6地址块
    function achieve_v6block(callback){
        $.ajax({
            url:'v6block/',
            type:'get',
            dataType:'json',
            success:function(data){
                console.log(data);
                callback(data);
            },
            fail:function(err){
                console.log(err);
            }
        })
    }

    //获取IPv6用户量Top10
    function achieve_user(){
        var data = UsersData.data,
            arraydata = [],
            html = '';
        for(var i = 0; i<data.length; i++){
            var user_num = data[i][3];
            user_num = snt(user_num);
            var user_per = data[i][4];
            data[i].splice(3,1,user_num);
            switch(data[i][0]){
                case 'IN':
                    var country = '印度';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#in-user').html(users);
                    break;
                case 'US':
                    var country = '美国';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#us-user').html(users);
                    break;
                case 'BR':
                    var country = '巴西';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#br-user').html(users);
                    break;
                case 'JP':
                    var country = '日本';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#jp-user').html(users);
                    break;
                case 'DE':
                    var country = '德国';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#de-user').html(users);
                    break;
                case 'GB':
                    var country = '英国';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];
                    break;
                case 'FR':
                    var country = '法国';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];
                    break;
                case 'CN':
                    var country = '中国';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];
                    //中国用google的测试数据
                    var user_per = (data[i][2]*100).toFixed(2);
                    data[i][4] = Number(user_per);

                    var users = '<h3>IPv6用户数量：'+data[i][3]+'万</h3>'
                    $('#title-ipv6user').html(users);
                    $('#china-ipv6per').html(user_per+'%');
                    break;
                case 'CA':
                    var country = '加拿大';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];
                    break;
                case 'BE':
                    var country = '比利时';
                    data[i].splice(1,1,country);
                    arraydata[arraydata.length] = data[i];

                    var obj = {"user":{}};
                    obj.user.country = country;
                    obj.user.per = data[i][4];
                    arraymap[arraymap.length] = obj;

                    var users = '用户：'+data[i][4]+'%';
                    $('#be-user').html(users);
                    break;                                 
            }
        }   
        console.log(arraydata);
        //根据用户数量多少排序
        arraydata.sort(function(x,y){
            return y[3]-x[3];
        });
        for(var i =0;i<arraydata.length;i++){
            var user_id = i+1;
            html += '<tr class="table-contents">'+
                        '<td class="user-id">'+user_id+'</td>'+
                        '<td>'+arraydata[i][1]+'</td>'+
                        '<td class="num">'+arraydata[i][3]+'</td>'+
                        '<td class="proportion">'+arraydata[i][4]+'%</td>'+
                    '</tr>';
        }
        var dom = '<table class="table table-bordered">'+
                        '<thead>'+
                            '<tr class="table-headings">'+
                                '<th class="user-table-title">排名</th>'+
                                '<th class="user-table-title">国家</th>'+
                                '<th class="user-table-title">用户量</th>'+
                                '<th class="user-table-title">比例</th>'+
                            '</tr>'+
                        '</thead>'+
                        '<tbody>'+html+'</tbody></table>';  
        $('#ipv6_user_rank').html(dom);                    
    }

    function achieve_content(){
        var data = ContentData.data;
        for(var i = 0; i<data.length; i++){
            switch(data[i][0]){
                case 'IN':
                    var country = '印度';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[3].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#in-contents').html(contents);
                    break;
                case 'US':
                    var country = '美国';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[5].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#us-contents').html(contents);
                    break;
                case 'BR':
                    var country = '巴西';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[1].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#br-contents').html(contents);
                    break;
                case 'JP':
                    var country = '日本';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[4].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#jp-contents').html(contents);
                    break;
                case 'DE':
                    var country = '德国';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[2].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#de-contents').html(contents);
                case 'BE':
                    var country = '比利时';
                    var obj = {};
                    obj.per = (data[i][6]*100).toFixed(2);
                    obj.country = country;
                    arraymap[0].content = obj;

                    var contents = '内容：'+(data[i][6]*100).toFixed(2)+'%';
                    $('#be-contents').html(contents);
                    break;                                 
            }
        }   
    }
    function achieve_allocation(){
        var data = AllocationData.data;
        for(var i = 0; i<data.length; i++){
            switch(data[i][0]){
                case 'IN':
                    var country = '印度';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[3].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#in-address').html(address);
                    break;
                case 'US':
                    var country = '美国';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[5].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#us-address').html(address);
                    break;
                case 'BR':
                    var country = '巴西';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[1].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#br-address').html(address);
                    break;
                case 'JP':
                    var country = '日本';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[4].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#jp-address').html(address);
                    break;
                case 'DE':
                    var country = '德国';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[2].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#de-address').html(address);
                case 'BE':
                    var country = '比利时';
                    var obj = {};
                    obj.per = (data[i][3]*100).toFixed(2);
                    obj.country = country;
                    arraymap[0].prefixes = obj;

                    var address = '宣告路由：'+(data[i][3]*100).toFixed(2)+'%';
                    $('#be-address').html(address);
                    break;                                 
            }
        }   
    }
    //科学计数法转为正常数值Scientific notation
    function snt(numb){
        var num = new Number(numb);
        num = Math.round(num/10000);
        return num;    
    }

    function getArrayItems(arr, num) {
    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        //取出的数值项,保存在此数组
        var return_array = new Array();
        for (var i = 0; i<num; i++) {
            //判断如果数组还有可以取出的元素,以防下标越界
            if (temp_array.length>0) {
                //在数组中产生一个随机索引
                var arrIndex = Math.floor(Math.random()*temp_array.length);
                //将此随机索引的对应的数组元素值复制出来
                return_array[i] = temp_array[arrIndex];
                //然后删掉此索引的数组元素,这时候temp_array变为新的数组
                temp_array.splice(arrIndex, 1);
            } else {
                //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
                break;
            }
        }
        return return_array;
    }

    function createItems(data){
        var html = '';
        var items = getArrayItems(data, 5);
        for(var i = 0;i<items.length;i++){
            var dns = items[i].dns,
                domain = items[i].domain,
                mail = items[i].mail,
                org = items[i].org,
                url = items[i].url,
                web = items[i].web;
            var ipv = (web.color == 'green')?"IPv6":"IPv4";   
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+ipv+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered normal-table" name="university">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title normal-url">域名</th>'+
                            '<th class="table-title normal-org">组织</th>'+
                            '<th></th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#university').html(dom);            
    }

    function createcom(data){
        var html = '';
        var items = getArrayItems(data, 10);
        for(var i = 0;i<items.length;i++){
            var dns = items[i].dns,
                domain = items[i].domain,
                mail = items[i].mail,
                org = items[i].org,
                url = items[i].url,
                web = items[i].web;
            var ipv = (web.color == "green")?"IPv6":"IPv4";   
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+ipv+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered normal-table" name="commercial">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title normal-url">域名</th>'+
                            '<th class="table-title normal-org">组织</th>'+
                            '<th></th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#commercial').html(dom);         
    }

    function creategov(data){
        var html = '';
        var items = getArrayItems(data, 8);
        for(var i = 0;i<items.length;i++){
            var dns = items[i].dns,
                domain = items[i].domain,
                mail = items[i].mail,
                org = items[i].org,
                url = items[i].url,
                web = items[i].web;  
                html += '<tr class="table-contents">'+
                            '<td>'+domain+'</td>'+
                            '<td>'+org+'</td>'+
                            '<td class="'+web.color+'">'+web.result+'</td>'+
                            '<td class="'+mail.color+'">'+mail.result+'</td>'+
                            '<td class="'+dns.color+'">'+dns.result+'</td>'+
                        '</tr>' ;   

        }
        var dom = '<table class="table table-bordered gov-table" name="goverment">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="table-title" id="gov-url">域名</th>'+
                            '<th class="table-title" id="gov-org">组织</th>'+
                            '<th class="table-title gov-web">Web</th>'+
                            '<th class="table-title gov-web">Mail</th>'+
                            '<th class="table-title gov-web">DNS</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+ html +'</tbody>'+
                    '</table>';
        $('#goverment').html(dom);            
    }


    function createblock(data){
        var html = '';
        var items = data.top10;
        var total = data.total;
        var china_ipv6_block = '';
        var CNAdvertised = data.CNAdvertised;
        var CNpro = '';
        for(var i=0;i<items.length;i++){
            var id = i+1;
            for(var j in items[i]){
                switch(j){
                    case 'CN':
                        var country = '中国大陆';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                        //计算国内宣告路由占比 你
                        china_ipv6_block = items[i][j];
                        CNpro = (CNAdvertised/china_ipv6_block*100).toFixed(2);
                    break;
                    case 'US':
                        var country = '美国';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;
                    case 'DE':
                        var country = '德国';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;    
                    case 'GB':        
                        var country = '英国';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;    
                    case 'FR':    
                        var country = '法国';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;    
                    case 'JP':
                        var country = '日本';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;    
                    case 'AU':
                        var country = '澳大利亚';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j]; 
                    break;    
                    case 'IT':
                        var country = '意大利';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion;
                        items[i].num = items[i][j];
                    break;    
                    case 'NL':
                        var country = '荷兰';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion; 
                        items[i].num = items[i][j];
                    break;     
                    case 'KR':
                        var country = '韩国';
                        var proportion = (items[i][j]/total*100).toFixed(2)+'%';
                        items[i].country = country;
                        items[i].pro = proportion; 
                        items[i].num = items[i][j];
                    break;                      
                }
                
            }  
        }
        for(var i =0;i<items.length;i++){
            var user_id = i+1;
            html+='<tr class="table-contents">'+
                            '<td class="user-id">'+user_id+'</td>'+
                            '<td>'+items[i].country+'</td>'+
                            '<td class="num">'+items[i].num+'</td>'+
                            '<td class="proportion">'+items[i].pro+'</td>'+
                        '</tr>';
        }
        var dom ='<table class="table table-bordered">'+
                    '<thead>'+
                        '<tr class="table-headings">'+
                            '<th class="user-table-title">排名</th>'+
                            '<th class="user-table-title">国家</th>'+
                            '<th class="user-table-title">数量</th>'+
                            '<th class="user-table-title">比例</th>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+html+'</tbody></table>';

        var ipv6_block_total = '<h3>IPv6地址数量：'+china_ipv6_block+'<span>块/32</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;宣告路由：'+CNAdvertised+'<span>块/32</span>(占比'+CNpro+'%)</h3>';             
        
        $('#ipv6_block').html(dom);
        $('#ipv6_block_total').html(ipv6_block_total);
    }
})()