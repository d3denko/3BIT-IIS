/**
 * author: laravel
 * component: None
 * view: None
 * uses for this comment: None
 */

import React from 'react';
import ReactDOM from 'react-dom';

function Example() {
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">vdgs Component</div>

                        <div class="card-body">I'm an example component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example/>, document.getElementById('example'));

}
