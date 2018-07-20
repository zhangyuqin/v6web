from django.db import models

class Website(models.Model):
    domain = models.CharField('域名', max_length=256)
    url = models.CharField('网址',  max_length=512)
    org = models.CharField('组织机构',  max_length=100)
    wtype = models.CharField('类型', max_length=30, choices=(
           ('gov','政府部门'),
           ('com','商业网站'),
           ('edu','高校'),
            ))

    def __str__(self):
        return self.domain
