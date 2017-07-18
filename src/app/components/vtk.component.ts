import { Component } from '@angular/core';
import { vtkFullScreenRenderWindow } from '../../node_modules/vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import { vtk } from 'vtk.js/'

//declare var vtk:any;

@Component({
    moduleId: module.id,
    selector: 'vtk',
    templateUrl: './vtk.component.html',

})
export class VtkComponent  {
    fullScreenRenderer: any;
    actor: any;
    actor2: any;
    actor3: any;
    mapper: any;
    mapper2: any;
    mapper3: any;
    cone: any;
    renderer: any;
    renderWindow: any;
    model: any;
    style: any;
    resolution: number;
    polydata: any;
    reader: any;

    constructor(){
        this.resolution = 5;
        this.style = {
            margin: '0',
            padding: '0',
            position: 'absolute',
            top: '0',
            left: '50vw',
            width: '50vw',
            height: '50vh',
            overflow: 'hidden',
        };


        this.polydata = vtk({
            vtkClass: 'vtkPolyData',
            points: {
                vtkClass: 'vtkPoints',
                dataType: 'Float32Array',
                numberOfComponents: 3,
                values: [
                    0, 0, 0,
                    1, 0, 0.25,
                    1, 1, 0,
                    0, 1, 0.25,
                ],
            },
            polys: {
                vtkClass: 'vtkCellArray',
                dataType: 'Uint16Array',
                values: [
                    3, 0, 1, 2,
                    3, 0, 2, 3,
                ],
            },
            pointData: {
                vtkClass: 'vtkDataSetAttributes',
                activeScalars: 0,
                arrays: [{
                    data: {
                        vtkClass: 'vtkDataArray',
                        name: 'pointScalars',
                        dataType: 'Float32Array',
                        values: [0, 1, 0, 1],
                    },
                }],
            },
            cellData: {
                vtkClass: 'vtkDataSetAttributes',
                activeScalars: 0,
                arrays: [{
                    data: {
                        vtkClass: 'vtkDataArray',
                        name: 'cellScalars',
                        dataType: 'Float32Array',
                        values: [0, 1],
                    },
                }],
            },
        });


        // with OnInit and elementRef: but it's  not possible to change body in vtk
        // unless created our own bundle
        // this.ele = this.elementRef.nativeElement.querySelector('.myvtk');
        // this.model = {rootContainer: this.ele};
        this.fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance({background: [0, 100, 0],
                                                                                            containerStyle: this.style});
        this.actor = vtk.Rendering.Core.vtkActor.newInstance();
        this.actor2 = vtk.Rendering.Core.vtkActor.newInstance();
        this.mapper= vtk.Rendering.Core.vtkMapper.newInstance();
        this.mapper2= vtk.Rendering.Core.vtkMapper.newInstance();
        this.mapper2.setInputData(this.polydata);
        this.cone  = vtk.Filters.Sources.vtkConeSource.newInstance();
        this.cone.setResolution(this.resolution);
        this.cone.setCapping(false);
        this.actor.setMapper(this.mapper);
        this.actor2.setMapper(this.mapper2);
        this.mapper.setInputConnection(this.cone.getOutputPort());
        this.renderer = this.fullScreenRenderer.getRenderer();
        this.renderer.addActor(this.actor);
        this.renderer.addActor(this.actor2);
        this.renderWindow = this.fullScreenRenderer.getRenderWindow();

        // this.reader = vtk.IO.Misc.vtkOBJReader.newInstance();
        // this.actor3 = vtk.Rendering.Core.vtkActor.newInstance();
        // this.mapper3= vtk.Rendering.Core.vtkMapper.newInstance();
        // this.mapper3.setInputConnection(this.reader.getOutputPort());
        // this.actor3.setMapper(this.mapper3);
        // this.reader.setUrl('https://data.kitware.com/api/v1/file/589b535f8d777f07219fcc58/download', { fullpath: true, compression: 'gz' }).then(() => { // '/js/heart.vtk'
        //     this.reader.loadData().then(() => {
        //         this.renderer.resetCamera();
        //         this.renderWindow.render();
        //     });
        // });
            // .then(() => {
            //     // dataModel.size.object = this.reader.getOutputData().getBounds();
            //     // updateUI();

            //     this.renderer.addActor(this.actor3);
            //     this.renderer.resetCamera();
            //     this.renderWindow.render();
            //     // onClick();
            // });
        console.log("this reader:", this.reader);
        this.renderer.addActor(this.actor3);
        this.renderer.resetCamera();
        this.renderWindow.render();



        console.log(this.fullScreenRenderer);
        console.log(this.model);
        console.log(this.cone.getCapping());

    }

    updateRes(){
        console.log("Changing to...", this.resolution);
        this.cone.setResolution(this.resolution);
        this.renderWindow.render();
    }

}
