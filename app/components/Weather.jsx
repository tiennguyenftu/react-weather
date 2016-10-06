var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');
var ErrorModal = require('ErrorModal');

var Weather = React.createClass({

    getInitialState: function () {
        return {
            isLoading: false
        }
    },

    handleSearch: function (location) {
        var self = this;

        this.setState({
            isLoading: true,
            errorMessage: undefined
        });

        openWeatherMap.getTemp(location).then(function (temp) {
            self.setState({
                location: location,
                temp: temp,
                isLoading: false
            })
        }, function (e) {
            self.setState({
                isLoading: false,
                errorMessage: e.message
            });
        });
    },

    render: function () {
        var {isLoading, temp, location, errorMessage} = this.state;

        function renderMessage() {
            if (isLoading) {
                return <p className="text-center">Fetching weather...</p>
            } else if (temp && location) {
                return <WeatherMessage temp={temp} location={location}/>
            }
        }

        function renderError() {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }

        return (
           <div>
               <h1 className="text-center page-title">Get Weather</h1>
               <WeatherForm onSearch={this.handleSearch}/>
               {renderMessage()}
               {renderError()}
           </div>
        )
    }
});

module.exports = Weather;