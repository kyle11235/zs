const baseUrl = 'http://localhost:8983/solr/db/select';
const cats = ["cat1","cat2","cat3","cat4","cat5"];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '',
      result: {
        responseHeader: {},
        response: {
          docs: []
        },
        facet_counts:{
          facet_fields:{}
        }
      },
      filters:{}
    };

    cats.forEach(cat => {
      this.state.filters[cat] = {};
    });
   
    this.handleChangeQuery = this.handleChangeQuery.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
  }

  componentDidMount() {
    this.search();
  }

  handleChangeQuery(e) {
    this.setState({q: e.target.value});
    this.search();
  }

  handleChangeFilter(cat, value, e) {
    const target = e.target;
    const checked = target.checked;
    console.log(cat, value, e, checked);

    this.state.filters[cat][value] = checked;
    this.setState({filters: this.state.filters});
    
    this.search();
  }

  search() {
    console.log('---new search---');
    this.setState((currentState) => {
        let that = this;

        // q
        let q = $.trim(currentState.q);
        console.log('q=' + q);
        if(q === null || q === ''){
          q = '*:*';
        }else{
          q = q.split(' ').filter(e =>{
            if($.trim(e) !== ''){
              return e;
            }
          }).map(e => {
            return '"' + e + '"';
          }).join(' OR ');
        }
        q = '(' + q + ')'
        console.log('q=' + q);

        // filters
        console.log('filters=' + JSON.stringify(currentState.filters));
        for(cat in currentState.filters){
          let values = [];
          let filter = currentState.filters[cat];
          for(value in filter){
              if(filter[value] === true){
                values.push(value);
              }
          }

          if(values.length > 0){
            q = q + ' AND (';
            q = q + values.map(value => '(' + cat + ':' + value + ')').join(' OR ');
            q = q + ')';
          }
        }
        console.log('q=' + q);

        // ajax
        let data = {
          q:q,
          wt:"json",
          facet: "on",
          "facet.field": cats
        };
        $.ajax({
            type: "GET",
            url: baseUrl,
            data: data,
            contentType: "application/json",
            dataType: "json",
            traditional: true,
            success: function (data) {
                that.setState({result: data});
            }
        });
    });
  }


  render() {
    
    let facet_fields = this.state.result.facet_counts.facet_fields;

    let filters = [];
    for(cat in facet_fields){
      let arr = facet_fields[cat];

      
      let valueList = [];
      for(let i = 0; i< arr.length -1; i = i+2){
        let value = arr[i];
        let count = arr[i+1];
        valueList.push({
          value: value,
          count, count
        });
      }

      valueList = valueList.sort((a,b) => {
        return a.value > b.value? 1:-1;
      });

      let liList = [];
      for(let i = 0; i< valueList.length; i++){
        let value = valueList[i].value;
        let count = valueList[i].count;
        let checked = this.state.filters[cat][value];
        liList.push(
            <li key={cat+value} className="nav-item">
              <span className="nav-link"><input type="checkbox" checked={checked?checked:''} onChange={this.handleChangeFilter.bind(this, cat, value)}/> {value} ({count})</span>
            </li>
        );
      }


      filters.push(
        <ul key={cat} className="nav flex-column">
          <li className="nav-item">
            <span className="nav-link active" href="#">{cat}</span>
          </li>
          {liList}
        </ul>
      );
    }


    let docs = this.state.result.response.docs.map(doc =>
        <div key={doc.id} className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mb-3">
          <div className="card" style={{width:"100%"}}>
            <div className="card-body">
              <h5 className="card-title">{doc.title} (ID:{doc.id})</h5>
              <p className="card-text">{doc.description}</p>
              <p className="card-subtitle mb-2 text-muted">类别: {doc.cat1} > {doc.cat2} > {doc.cat3} > {doc.cat4} > {doc.cat5}</p>
              <p className="card-subtitle mb-2 text-muted">创建时间: {doc.create_time}, 创建人: {doc.create_by}</p>
              <p className="card-subtitle mb-2 text-muted">更新时间: {doc.update_time}, 更新人: {doc.update_by}</p>
              <a href="#" className="card-link">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div> 
    );

    return <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" 
                       value={this.state.q}
                       onChange={this.handleChangeQuery} aria-label="Search"/>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
          </ul>
        </nav>

        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                
                  {filters}
                
              </div>
            </nav>

            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand" ><div></div></div><div className="chartjs-size-monitor-shrink"><div></div></div></div>
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <p>找到相关结果 {this.state.result.response.numFound} 个, 用时 {this.state.result.responseHeader.QTime} 毫秒</p>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                    <button type="button" className="btn btn-sm btn-outline-secondary">上一页</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary">下一页</button>
                  </div>
                </div>
              </div>

              {docs}
                    
            </main>
          </div>
        </div>
    </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('App'));