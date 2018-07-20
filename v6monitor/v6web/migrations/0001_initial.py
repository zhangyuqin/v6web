# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-30 09:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Website',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('domain', models.CharField(max_length=256, verbose_name='域名')),
                ('url', models.CharField(max_length=512, verbose_name='网址')),
                ('org', models.CharField(max_length=100, verbose_name='组织机构')),
                ('wtype', models.CharField(choices=[('gov', '政府部门'), ('com', '商业网站'), ('edu', '高校'), ('dnsdist', 'dnsdist')], max_length=30, verbose_name='类型')),
            ],
        ),
    ]
