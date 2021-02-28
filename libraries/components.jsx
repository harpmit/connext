class ConnectionTile extends React.Component {

  render() {
    return (
        <div className='ConnectionTile'>
            <img className='profilePicture' src={this.props.src} alt="Profile picture"/>
            <div className='profileDescription'>
                <p className='tightContent connectionName'>{this.props.name}</p>
                <p className='tightContent jobTitle'>{this.props.jobName}</p>
                <p className='tightContent'>{this.props.description}</p>
            </div>
        </div>
        );
  }
}

let mickey = {'src':'assets/example_images/mickey_mouse.jpg',
              'name':'Mickey Mouse',
              'jobName': 'King of the Magic Kingdom',
              'description': "I've worked my way up from a steamboat crewman to king of the Magic Kingdom"}
ReactDOM.render(<ConnectionTile src={mickey.src} name={mickey.name} jobName={mickey.jobName} description={mickey.description}/>, 
                document.getElementById('react1'))
let scooby = {'src':'assets/example_images/scooby_doo.jpg',
              'name':'Scooby Doo',
              'jobName': 'Mascot for a Private Detective Agency',
              'description': "I love scooby-snacks and hate scary ghosts"}
ReactDOM.render(<ConnectionTile src={scooby.src} name={scooby.name} jobName={scooby.jobName} description={scooby.description}/>, document.getElementById('react2'))
let spongebob = {'src':'assets/example_images/spongebob.jpg',
              'name':'Spongebob',
              'jobName': 'Fry Cook at the Krusty Crab',
              'description': "I would rather be jellyfishing"}
ReactDOM.render(<ConnectionTile src={spongebob.src} name={spongebob.name} jobName={spongebob.jobName} description={spongebob.description}/>, document.getElementById('react3'))
let homer = {'src':'assets/example_images/homer_simpson.jpg',
              'name':'Homer Simpson',
              'jobName': 'Nuclear Engineer?',
              'description': "D'oh!"}
ReactDOM.render(<ConnectionTile src={homer.src} name={homer.name} jobName={homer.jobName} description={homer.description}/>, document.getElementById('react4'))