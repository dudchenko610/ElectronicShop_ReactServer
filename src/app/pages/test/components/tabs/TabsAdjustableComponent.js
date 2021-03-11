import React, { Component } from "react"

import "./styles/tab-adjustable-styles.css"

// tabCount
// tabWidth
// adjustTabHeight

class TabsAdjustableComponent extends Component {

    constructor(props) {
        super(props)

        this.tabContainerRef = React.createRef()
        

        this.state = {
            ...this.state,

            tabs : [],
            tabsContent: [],
            activeTabIndex: 0,
            prevActiveTabIndex: 0,

            currentTabScrollHeight: 0,
            isLoaded: false
        }

        
    }

    openTab(index) {

        let currentTabScrollHeight = 0

        if ( this.state.tabsContent[index] && this.state.tabsContent[index].tabRef.current ) {
            currentTabScrollHeight = this.state.tabsContent[index].tabRef.current.scrollHeight
        }



        this.setState(
            function (state, props) {
                return {
                    ...state,
                    prevActiveTabIndex: state.activeTabIndex,
                    activeTabIndex: index,
                    currentTabScrollHeight : currentTabScrollHeight
                }
        })
       // this.state.prevActiveTabIndex = this.state.activeTabIndex
       // this.state.activeTabIndex = index

       // this.updateComponent()
    }

    componentDidMount() {
        const tabCount = parseInt(this.props.tabCount)
        const tabs = []
        const tabsContent = []


        for (var i = 0; i < tabCount; i ++) {
            tabs.push({
                index: i,
                tabRef: React.createRef()
            })

            tabsContent.push({
                index: i,
                tabRef: React.createRef()
            })
        }

        this.setState( { tabs: tabs, tabsContent: tabsContent } )

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!this.state.isLoaded) {

            let currentTabScrollHeight = 0
            if ( this.state.tabsContent[0] && this.state.tabsContent[0].tabRef.current ) {
                currentTabScrollHeight = this.state.tabsContent[0].tabRef.current.scrollHeight
            }

            

            this.setState( { isLoaded: true, currentTabScrollHeight: currentTabScrollHeight } )
        }
    }


    onTabClicked(index) {
        this.openTab(index)
    }

    onTabName(index) {
        return <div>{ index }</div>
    }

    onTabContentOuter(index) {

        const activeStyle = this.state.activeTabIndex == index ? "current-tab" : ""

        return (
            <div 
                className = { "icetab " + activeStyle }
                key = { index }
                style = {
                    {
                        width: this.props.tabWidth
                    }
                }
                onClick = {
                    (event => {
                        this.state.prevActiveTabIndex = this.state.activeTabIndex
                        this.state.activeTabIndex = index

                        this.onTabClicked(index)
                    })
                }
            >{ this.onTabContent(index) }</div>
        )
    }

    onContent(index) {
        return (<div>content {index}</div>)
    }

    onContentOuter(index) {

        const activeStyle = this.state.activeTabIndex == index ? "tab-active" : ""

        const currentTabScrollHeight = this.state.currentTabScrollHeight
        var scrollHeight = currentTabScrollHeight

        if ( this.state.tabsContent[index] && this.state.tabsContent[index].tabRef.current ) {
            scrollHeight = this.state.tabsContent[index].tabRef.current.scrollHeight
        }



        const style = this.props.adjustTabHeight 
            ? 
                { 
                    height: currentTabScrollHeight + "px"
                } 
            
            :   {  }

        const percent = ((scrollHeight / currentTabScrollHeight) + 1) * -100

        if ( this.state.activeTabIndex != index ) {
            style.transform = "translateY(" + percent + "%)"
	        style.mozTransform = "translateY(" + percent + "%)"
	        style.webkitTransform = "translateY(" + percent + "%)"
        }

        console.log(style)
        
        return (
            <div 
                key = { index }
                className = { "tabcontent " + activeStyle }
            

                style = { style }
            >
                {
                    this.onContent(index)
                }
            </div>
        )
    }

    render () {
        return (
            <div 
                className = { "mytabs-container"}
            >

                <div className = "inner-container">
                    {
                        this.state.tabs.map((tab, index, array) => {
                            return this.onTabContentOuter(index)
                        })
                    }
                </div>

                <div 
                    className = { "tabs-content"}
                    
                    >
                    {
                        this.state.tabs.map((tab, index, array) => {
                            return this.onContentOuter(index)
                        })
                    }
                </div>

            </div>
        )
    }
}

export default TabsAdjustableComponent