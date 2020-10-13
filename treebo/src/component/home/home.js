import React from 'react';
import {COMPONENT_CONSTANT,COMPONENT_LABEL,COMPONENT_VARIABLE,THOUGHT_OF_THE_DAY} from '../../constant/constant';
import Modal from '../../common/Modal/modal';
import './home.scss';

export default class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentList:[COMPONENT_CONSTANT.MODAL],
            activeComponentIndex:null,
            ModalConfig: [],
            InlineStyle:{
                height: '600px',
                width: '500px'
            }
        };
    }

    addComponent=(idx)=>{
        this.setState({
            activeComponentIndex:idx 
        })
    }

    addModal=()=>{
        const {ModalConfig,InlineStyle} = this.state;
        let length = ModalConfig.length;
        let configuration = {
            heading:`Modal ${length+1}`,
            style: {
                width: InlineStyle.width,
                height:InlineStyle.height 
            }
        }
        ModalConfig.push(configuration);
        this.setState({
            ModalConfig
        })
    }

    updateInlineStyle=(e,inlineStyleType)=>{
        switch(inlineStyleType){
            case COMPONENT_VARIABLE.HEIGHT:
                this.setState({
                    InlineStyle:{
                        height:e.target.value
                    }
                })
                break;
            case COMPONENT_VARIABLE.WIDTH:
                this.setState({
                    InlineStyle:{
                        width:e.target.value
                    }
                })
                break;
            default:
            break;
        }
    }

    generatedBody=(component)=>{
        const {InlineStyle}=this.state
        switch (component){
            case null:
                return;
            case COMPONENT_CONSTANT.MODAL:
                return (
                    <div>
                        <button className="pointer" onClick={()=> this.addModal()}>Launch New Modal</button>
                        <div className="inlineStyleContainer">
                            <label>{COMPONENT_LABEL.STYLE_LABEL}</label>
                            <input className="inputBox" type='text' value={InlineStyle.height} onChange={(e)=> this.updateInlineStyle(e,COMPONENT_VARIABLE.HEIGHT)} placeholder={COMPONENT_LABEL.HEIGHT} />
                            <input className="inputBox" type='text' value={InlineStyle.width}  onChange={(e)=> this.updateInlineStyle(e,COMPONENT_VARIABLE.WIDTH)}  placeholder={COMPONENT_LABEL.WIDTH} />
                        </div>
                    </div>
                )
                break;
        }
    }

    saveClickCallback=(idx)=>{
        
    }

    cancelClickCallback=(idx)=>{
        const {ModalConfig}=this.state
        ModalConfig.splice(idx,1);
        this.setState({
            ModalConfig
        })
    }

    generateModalBody=()=>{
        let text = THOUGHT_OF_THE_DAY[Math.floor(Math.random() * THOUGHT_OF_THE_DAY.length)]
        return (
            <div>
                <p>{text}</p>
            </div>
        )
    }

    render() {
        const {componentList,activeComponentIndex,ModalConfig} = this.state
        const rightPanel = this.generatedBody(componentList[activeComponentIndex])
        return (
            <React.Fragment>
                <div className="header text">
                    Treebo Storybook
                </div>
                <div className="container">
                    <section className="left-panel">
                        <ul>
                            <li>E x a m p l e</li>
                            <li className="pointer">Introduction</li>
                            {componentList.map((component,index)=>{
                                return(
                                    <li onClick={()=> this.addComponent(index)} className="pointer" key={index}>
                                        {component}
                                    </li>  
                                )
                            })}
                        </ul>
                    </section>
                    <section className="right-panel">
                        {rightPanel}
                        {ModalConfig.length>0 && ModalConfig.map((modal,index)=>{
                            return(
                                <Modal
                                heading= {modal.heading}
                                modalBody={this.generateModalBody()}
                                primaryBtn={{
                                    id: 'primaryButton',
                                    show: true,
                                    text: 'Submit',
                                    onClick: ()=> this.saveClickCallback(index)
                                }}
                                secondaryBtn={{
                                    id: 'secondaryButton',
                                    show: true,
                                    text: 'Cancel',
                                    onClick: ()=> this.cancelClickCallback(index)
                                }}
                                customWrapperClass={""}
                                customInlineStyle={modal.style}
                                cancelClickCallback={()=>this.cancelClickCallback(index)}
                                key={index}
                                />
                            )
                        })}
                        
                    </section>
                </div>
            </React.Fragment>
        );
    }
}
