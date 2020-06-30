import React from 'react';
import './index.less';
import ListItem from '../ListItem';
import Loading from '../../../components/Loading';
class HomeLists extends React.Component{

    constructor(props){
        super(props);
        this.myRef=React.createRef();
    };

    handleScroll=()=>{
        let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;;
        let clientHeight=document.documentElement.clientHeight;
        let likeOffsetHeight=this.myRef.current.offsetHeight;
        let likeOffsetTop=this.myRef.current.offsetTop;
        //html.scrollTop+html.clientHeight>=元素.offsetTop+元素.offsetHeight;
        if(scrollTop+clientHeight>=likeOffsetHeight+likeOffsetTop){
            console.log('1');
            this.props.listAPI();
        }
    };
    componentDidMount() {
        document.addEventListener('scroll',this.handleScroll);
    }
    componentWillUnmount() {
        document.removeEventListener('scroll',this.handleScroll);
    }

    render(){
        let {dataSource,loadingText}=this.props;
        console.log(loadingText);
        return(
            <div className="homeLists" ref={this.myRef}>
                <div className="homeLists-title">推荐商品</div>
                <div className="homeLists-content clearfix">
                    {
                        dataSource.map((item,index)=>{
                            return (
                                <ListItem itemData={item} key={index}/>
                            )
                        })
                    }
                </div>
                <Loading loadingText={loadingText}/>
            </div>
        )
    }
}
export default HomeLists;