import React from 'react';
import { Group, Tabs, TabsItem } from "@vkontakte/vkui";
import SwitchButton from "./SwitchButton";

class Switch extends React.Component {
    state = {
        activeSheet: null,
        availableSheets: []
    };

    setActiveSheet = (sheetIndex) => {
        this.setState({
            activeSheet: sheetIndex
        })
    };

    setAvailableSheets = (sheets) => {
        this.setState({
            availableSheets: sheets
        });
    };

    getAvailableSheets = async () => {
        let available = [];

        for (let child of this.props.children) {
            available.push({index: child.props.sheetIndex, name: child.props.sheetName});
        }

        return available;
    };

    renderSheet = () => {
        let childrenWithExtraProp = null;

        for (let child of this.props.children) {
            if (this.state.activeSheet === null) {
                childrenWithExtraProp = child;
                break;
            }

            if (child.props.sheetIndex === this.state.activeSheet) {
                childrenWithExtraProp = child;
                break;
            }
        }

        return childrenWithExtraProp;
    };

    renderButtons = () => {
        let firstIsActive = false;
        let isActive = false;

        const buttons = this.state.availableSheets.map((sheet, index) => {
            if (this.state.activeSheet === null && firstIsActive === false) {
                firstIsActive = true;
                isActive = true;
            } else {
                isActive = false
            }

            if (this.state.activeSheet === sheet.index) {
                isActive = true;
            }

            return <SwitchButton key={index}
                                 click={(e) => { e.preventDefault(); this.setActiveSheet(sheet.index); }}
                                 isActive={isActive} name={sheet.name} />;
        });

        return buttons;
    };

    async componentDidMount() {
        const sheets = await this.getAvailableSheets();
        this.setAvailableSheets(sheets);
    }

    render () {
        return (
            <>
                <Tabs type="buttons">
                    { this.renderButtons() }
                </Tabs>

                { this.renderSheet() }
            </>
        );
    }
}

export default Switch;