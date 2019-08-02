
# react + nodejs + solr + mysql + echarts + excel + auth and description?

## solr

- download

        http://archive.apache.org/dist/lucene/solr/6.5.1/

- run sample

        init only once by '/Users/kyle/workspace_pro/zs/solr651/bin/solr start -e techproducts'
        start by '/Users/kyle/workspace_pro/zs/solr651/bin/solr start'
        http://localhost:8983/solr/techproducts/browse
        reset by deletion of /Users/kyle/workspace_pro/zs/solr651/example/techproducts

- stop

        /Users/kyle/workspace_pro/zs/solr651/bin/solr stop

- config dih

- run dih

        /Users/kyle/workspace_pro/zs/solr651/bin/solr -e dih
        http://localhost:8983/solr/#/

- post/update to db of dih

        /u02/app/solr651/bin/post -c db /Users/kyle/workspace_pro/zs/solr651/example/exampledocs/zs/*.json

- query

        curl "http://localhost:8983/solr/db/select?indent=on&q=*:*&wt=json"

        query logic (free text is wrapped by "" to hit by "ab" AND "cd" instead of a OR b OR c OR d)
        e.g. 传送带 断裂 + cat2:海航 分公司 -> ("传送带" AND "断裂") AND (cat2:海航 分公司)

        http://localhost:8983/solr/db/select?facet.field=cat1&facet.field=cat2&facet.field=cat3&facet.field=cat4&facet.field=cat5&facet=on&hl.fl=description&hl=on&indent=on&q=("传送带" AND "断裂") AND (cat2:海航 分公司)&wt=json

## mysql

db:zs

## echarts

https://echarts.baidu.com/index.html

## excel

https://edu.gcfglobal.org/en/excel2013/charts/1/
https://support.office.com/en-us/article/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2

## react app

- pagination
