import React from 'react';
import {Link} from 'react-router-dom';
import './index.less';

class KindContent extends React.Component{

    renderLeft=()=>{
        let dataSource=this.props.dataSource || [];
        console.log(dataSource);
        return (
            dataSource.map((item,leftIndex)=>{
                            let cls=(leftIndex===this.props.currentLeftIndex)?'kindContent-left-item active':'kindContent-left-item';
                            return(
                                <div className={cls} key={item.tag}
                                     onClick={()=>this.handleLeftClick(leftIndex)}
                                >
                                    {item.kindName}
                                </div>
                            )
                        })
        )
    };
    handleLeftClick=(leftIndex)=>{
        this.props.clickLeftAPI(leftIndex);
    };

    renderRight=()=>{
        let currentLeftIndex=this.props.currentLeftIndex;//拿到左边当前高亮项的索引
        let dataSource=this.props.dataSource || [];//拿到总数组
        let currentData=dataSource[currentLeftIndex];//拿到左边高亮项对应的总数组的那一整项
        if(currentData){//currentData一定要判断是否存在,因为如果dataSource是[],currentData就是undefined了
            let p=<div className="right-title" key={1}>{currentData.kindName}</div>;
            return(
                [
                    p,
                    <div className="right-list-inner" key={2}>
                        {this.renderRightList(currentData.right)}
                    </div>
                ]
            )
        }else{
            return null;
        }
    };
    renderRightList=(rightData)=>{//rightData=[{"title":'肉类海鲜'},{"title":'新鲜果蔬'},...]
        return rightData.map((item,index)=>{
            return (
                <Link
                    className="right-list-item"
                    key={index}
                    to={{pathname:`/kind/classification/${item.title}`}}
                >
                    {item.title}
                </Link>
            )
        })
    };
    render(){
        return(
            <div className="kindContent">
                <div className="kindContent-left">
                    <div className="kindContent-left-inner">
                        {this.renderLeft()}
                    </div>
                </div>
                <div className="kindContent-right">
                    {this.renderRight()}
                </div>
            </div>
        )
    }
}
export default KindContent;