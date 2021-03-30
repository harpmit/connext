class SmallProfile extends React.Component {
  //Renders a quick profile summary with the picture, name, industry, connectionScore
  render() {
    return (
        <div className='connectionTile horizontalFlexBox'>
            <img className='smallImage' src={this.props.src}></img>
            <div className='profileDescription verticalFlexBox'>
                <p className='tightContent' id='name'>{this.props.name}</p>
                <p className='tightContent'>{'Industry: '+this.props.industry}</p>
                <p className='tightContent'>{'School: '+this.props.school}</p>
                <p className='tightContent'>{'Strength of Connection: '+this.props.connectionScore}</p>
            </div>
        </div>
        );
  }
}

class LargeProfile extends React.Component {
  //Renders a quick profile summary with the picture, name, industry, connectionScore
  render() {
    return (
        <div className='connectionTile verticalFlexBox'>
            <img className='largeImage' src={this.props.src}></img>
            <div className='profileDescription verticalFlexBox'>
                <p className='tightContent' id='name'>{this.props.name}</p>
                <p className='tightContent'>{'Industry: '+this.props.industry}</p>
                <p className='tightContent'>{'School: '+this.props.school}</p>
            </div>
        </div>
        );
  }
}

function addNewDiv() {
  let mainBody = document.getElementById('mainBody');
  let newName = mainBody.children.length + 10
  newName = 'react'+newName

  let newDiv = document.createElement("div")
  newDiv.setAttribute('id',newName)
  mainBody.appendChild(newDiv)
  return newName
}

function clearPage() {
  let parent = document.getElementById('mainBody');
  if (parent.children.length > 2) {
    while (parent.children.length > 2) {
      parent.removeChild(parent.children[2]);
    }
  }
}

function reactRender(htmlObject) {
  let newChild = addNewDiv()
  ReactDOM.render(htmlObject,document.getElementById(newChild))
}

