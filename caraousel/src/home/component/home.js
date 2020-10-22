import  React               from 'react';
import {COMPONENT_CONSTANT,
        COMPONENT_LABEL,
        COMPONENT_VARIABLE,
        THOUGHT_OF_THE_DAY} from '../../constant/home/home.constant';
import  Modal               from '../../common/modal/component/modal';
import  ImgageUploader      from '../../common/Imageuploader/component/Imageuploader';
import  Slider              from '../../common/carousel/components/slider';
import './home.scss';

export default class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            componentList:[COMPONENT_CONSTANT.IMAGEUPLOADER],
            activeComponentIndex:null,
            slider:[],
            modalConfig: [],
            inlineStyle:{
                height: '600px',
                width: '500px'
            }
        };
    }

    componentDidMount() {
        this.updateSlider();
    }

    updateSlider=()=>{
        let data = JSON.parse(localStorage.getItem('imageGallery'));
        let length=0;
        if (data != null && data.length > 0) {
            length = data.length;
        }
        this.setState({
            slider: data
        })
    }

    addComponent=(idx)=>{
        this.setState({
            activeComponentIndex:idx 
        })
    }

    addModal=()=>{
        const {modalConfig,inlineStyle} = this.state;
        let length = modalConfig.length;
        let configuration = {
            heading:`Modal ${length+1}`,
            style: {
                width: inlineStyle.width,
                height:inlineStyle.height 
            }
        }
        modalConfig.push(configuration);
        this.setState({
            modalConfig
        })
    }

    updateInlineStyle=(e,inlineStyleType)=>{
        const{inlineStyle}=this.state;
        switch(inlineStyleType){
            case COMPONENT_VARIABLE.HEIGHT:
                this.setState({
                    inlineStyle:{
                        height:e.target.value,
                        width: inlineStyle.width
                    }
                })
                break;
            case COMPONENT_VARIABLE.WIDTH:
                this.setState({
                    inlineStyle:{
                        height:inlineStyle.height,
                        width:e.target.value
                    }
                })
                break;
            default:
            break;
        }
    }

    ImageUploaderSaveCallClickBack=()=>{
        this.updateSlider();
    }

    generatedBody=(component)=>{
        const {inlineStyle}=this.state
        switch (component){
            case null:
                return;
            case COMPONENT_CONSTANT.MODAL:
                return (
                    <div>
                        <button className="pointer button-rp" onClick={()=> this.addModal()}>Launch New Modal</button>
                        <div className="inlineStyleContainer">
                            <label>{COMPONENT_LABEL.STYLE_LABEL}</label>
                            <input className="inputBox" type='text' value={inlineStyle.height || ''} onChange={(e)=> this.updateInlineStyle(e,COMPONENT_VARIABLE.HEIGHT)} placeholder={COMPONENT_LABEL.HEIGHT} />
                            <input className="inputBox" type='text' value={inlineStyle.width  || ''}  onChange={(e)=> this.updateInlineStyle(e,COMPONENT_VARIABLE.WIDTH)}  placeholder={COMPONENT_LABEL.WIDTH} />
                        </div>
                    </div>
                )
                break;
            case COMPONENT_CONSTANT.IMAGEUPLOADER:
                return(
                    <ImgageUploader 
                        saveClickCallback={this.ImageUploaderSaveCallClickBack}
                    />
                )
        }
    }

    saveClickCallback=(idx)=>{
        
    }

    cancelClickCallback=(idx)=>{
        const {modalConfig}=this.state
        if(modalConfig.length>0){
            modalConfig.pop();
            this.setState({
                modalConfig
            })  
        }
    }

    generateModalBody=(idx)=>{
        let text = THOUGHT_OF_THE_DAY[Math.floor(Math.random() * THOUGHT_OF_THE_DAY.length)]
        return (
            <img src="" />
        )
    }

    render() {
        const {componentList,modalConfig,slider} = this.state
        const rightPanel = this.generatedBody(COMPONENT_CONSTANT.IMAGEUPLOADER)
        return (
            <React.Fragment>
                <div className="header text">
                    Storybook
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
                        {slider && slider.length>0 && <Slider 
                            landingData={slider}
                            length={slider.length}
                        /> }
                        {modalConfig.length>0 && modalConfig.map((modal,index)=>{
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
