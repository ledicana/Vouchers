import React from 'react';
import classNames from 'classnames';

class Checkbox extends React.Component {

    static propTypes = {
        checked: React.PropTypes.bool,
        id: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func,
        caption: React.PropTypes.string.isRequired,
        className: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        tooltip: React.PropTypes.string
    };

    componentDidMount() {
        if (this.props.tooltip) {
            chayns.ui.tooltip.init();
        }
    }

    handleChange(event) {
        const {disabled, onChange} = this.props;
        if (!disabled && onChange) {
            onChange(event.target.checked);
        }
    }

    /**
     * Renders a checkbox.
     * @returns {XML}
     */
    render() {
        const {checked, id, caption, className, disabled} = this.props;
        const classes = classNames('dib', className);

        return (
            <div className={classes}>
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={checked}
                    onChange={::this.handleChange}
                    id={id}
                    disabled={disabled}/>
                <label htmlFor={id}>
                    {caption}
                </label>
            </div>
        );
    }

}

export default Checkbox;