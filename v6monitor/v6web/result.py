"""
check website support IPv6 status
check DNS,MAIL and WWW

OUTPUT: a list of dict
sample: [{
         'domain': 'xxx.com',
         'url': 'http://xxx.com',
         'org': 'xxx',
         'web': {
                'result': '[3] 3/0/3 [I]',
                'color': 'green'
                },
         'mail': {
                'result': '[3] 3/0/3 [I]',
                'color': 'green'
                },
         'dns': {
                'result': '[3] 3/0/3 [I]',
                'color': 'green'
                }
        }]
"""

import os
import sys
import datetime
import json

GOV_DIR = "/mnt/monitor-gov/results"
COM_DIR = "/mnt/monitor-com/results"
EDU_DIR = "/mnt/monitor-edu/results"
V6BLOCK = "/mnt/monitor-v6block/results/default/v6block.json"

def _one_item(lst=None):
    result_fmt = "[{0}] {1}/{2}/{3} [{4}]"
    return result_fmt.format(lst[0], lst[1], lst[2], lst[3], lst[4])

def new_item(domain, url, org, web, mail, dns):
    return dict( 
        domain = domain,
        url = url,
        org = org,
        web = {
               'result': _one_item(web),
               'color': color_web(web)
               },
        mail = {
               'result':  _one_item(mail),
               'color': color_mail(mail)
               },
        dns = {
               'result': _one_item(dns),
               'color': color_dns(dns)
               }
        )
    

def servfail(domain, url, org, web, mail):
    return dict( 
        domain = domain,
        url = url,
        org = org,
        web = {
               'result': _one_item(web),
               'color': color_web(web)
               },
        mail = {
               'result': _one_item(mail),
               'color': color_mail(mail)
               },
        dns = {
               'result': '[S] 0/0/0 [L]',
               'color': 'red'
               }
        )


def color_mail(mail=None):
    """
    Mail:[3] 3/0/3 [O]
    [3]: 3个MX记录
    3: 3个IPv6 地址
    0：0个IPv6地址能ping6 通
    3: 3个IPv6地址都能正常提MX服务
    
    Mail: 绿色条件， IPv6 地址数量>0， MX能正常服务的数量>0
    Mail: 黄色条件， IPv6 地址数量>0， MX能正常服务的数量=0
    Mail: 红色条件， IPv6 地址数量=0， MX能正常服务的数量=0
    Mail: 灰色条件， IPv6 地址数量=0， MX能正常服务的数量=0
    """
    mx_num = int(mail[0])
    ip6_num = int(mail[1])
    ping6_ok = int(mail[2])

    if mail[3] == 'N':
        mx6_ok = 0
    else:
        mx6_ok = int(mail[3])

    if mx_num == 0:
        return 'gray'
    elif ip6_num > 0 and mx6_ok > 0:
        return 'green'
    elif ip6_num > 0 and mx6_ok == 0:
        return 'yellow'
    elif ip6_num == 0 and mx6_ok == 0:
        return 'red'

def color_web(web=None):
    """
    Web:[3] 3/0/3 [O]
    [3]: 3个地址
    3: 3个IPv6 地址
    0：0个IPv6地址能ping6 通
    3: 3个IPv6地址都能正常提WEB服务
    
    Web: 绿色条件， IPv6 地址数量>0， 地址能正常服务的数量>0
    Web: 黄色条件， IPv6 地址数量>0， 地址能正常服务的数量=0
    Web: 红色条件， IPv6 地址数量=0， 地址能正常服务的数量=0
    Web: 灰色条件， IPv6 地址数量=0， 地址能正常服务的数量=0
    """
    addr_num = int(web[0])
    ip6_num = int(web[1])
    ping6_ok = int(web[2])

    if web[3] == 'N':
        http6_ok = 0
    else:
        http6_ok = int(web[3])

    if addr_num == 0:
        return 'gray'
    elif ip6_num > 0 and http6_ok > 0:
        return 'green'
    elif ip6_num > 0 and http6_ok == 0:
        return 'yellow'
    elif ip6_num == 0 and http6_ok == 0:
        return 'red'

def color_dns(dns=None):
    """
    DNS:[3] 3/0/3 [O]
    [3]: 3条NS记录
    3: 3个IPv6 地址
    0：0个IPv6地址能ping6 通
    3: 3个IPv6地址都能正常提供解析结果
    
    DNS: 绿色条件， NS记录>0, IPv6 地址数量>0， dns能正常服务的数量>0
    DNS: 黄色条件， NS记录>0, IPv6 地址数量>0， dns能正常服务的数量=0
    DNS: 红色条件， NS记录>0, IPv6 地址数量=0， dns能正常服务的数量=0 或者NS记录=S
    """

    ns_num = int(dns[0])
    ip6_num = int(dns[1])
    ping6_ok = int(dns[2])
    dig6_ok = int(dns[3])

    if ip6_num > 0 and dig6_ok > 0:
        return 'green'
    elif ip6_num > 0 and dig6_ok == 0:
        return 'yellow'
    elif ip6_num == 0 and dig6_ok == 0:
        return 'red'

def parse_result(f):
    """
    result file format:
        cn.gov.,http://www.gov.cn,中华人民共和国中央人民政府,,none,none,8,2,0,1,O,0,0,0,0,-,5,0,0,0,O,U,-,-,R,,
        cn.gov.xx.,http://www.xx.gov.cn,xxxx,,none,none,8,2,0,1,O,0,0,0,0,-,5,0,0,0,O,U,-,-,R,,
        .....
        v4totals,7,0,1
        v6totals,1,0,0

    process:
        split each line with ','
        skip the last 2 lines
        parse domain: cn.gov.
        parse url: http://www.gov.cn
        parse org: 中华人民共和国中央人民政府
        parse dns: 8,2,0,1,O
        parse mail: 0,0,0,0,-
        parse http: 5,0,0,0,O
    """
    results = []
    for line in f:
        ret = line.split(',')
        if len(ret) == 4:
            # skip the last 2 line
            continue
        #print(ret)
        # domain format 'org.icann.'
        l = ret[0].split('.')
        l.reverse()
        domain = '.'.join(l[1:])

        url = ret[1]
        org = ret[2]
        dns = ret[6:11]
        mail = ret[11:16]
        web = ret[16:21]

        # 计算WEB/MAIL/DNS结果,标出颜色值
        if dns[0] == 'S':
            # servfail
            results.append(servfail(domain, url, org, web, mail))
        else:
            results.append(new_item(domain, url, org, web, mail, dns))

    return results
          

def parse(monfile):
    with open(monfile) as f:
        return parse_result(f)

def result(path):
    """
    anaylze gov/com/edu website result

    """

    now = datetime.datetime.today()
    dirname = '{:%Y%m%d}'.format(now)
    result_json = "{path}/{dname}/ret.json".format(path=path, dname=dirname)
    if os.path.isfile(result_json):
        # json 结果文件是否已经存在, 存在就直接返回结果
        with open(result_json) as f:
            return dict(result=json.load(f))
    else:
        # 不存在，则分析测试结果，生成json文件，返回结果
        result_raw = "{path}/{dname}/govmon.www".format(path=path, dname=dirname)
        if not os.path.isfile(result_raw):
            # file result_raw 不存在，则使用前一天的结果
            delta = datetime.timedelta(days=-1)
            yesterday = now + delta
            dirname = '{:%Y%m%d}'.format(yesterday)
            result_json = "{path}/{dname}/ret.json".format(path=path, dname=dirname)
            with open(result_json) as f:
                return dict(result=json.load(f))
        else:
            ret = parse(result_raw)
            # generate json
            with open(result_json, 'w') as f:
                #print(ret)
                json.dump(ret, f, ensure_ascii=False)

            return dict(result=ret)

def v6block():
    """
    anaylze IPv6 address blocks status

    """
    if os.path.isfile(V6BLOCK):
        # json 结果文件是否已经存在, 存在就直接返回结果
        with open(V6BLOCK) as f:
            return dict(json.load(f))

def gov():
    return result(GOV_DIR)

def com():
    return result(COM_DIR)
        
def edu():
    return result(EDU_DIR)
        
if __name__ == "__main__":
    print(gov())
    print(com())
    print(edu())
