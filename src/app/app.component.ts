import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Mother32StateService } from './services/mother32-state.service';
import { EditorStateService } from './services/editor-state.service';
import { CableStateService } from './services/cable-state.service';
import { FileService } from './services/file.service';

import {
  Mother32,
  Connection,
} from './models';

import { getValue } from './util/observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

  name$: Observable<string>;
  notes$: Observable<string>;
  mother32s$: Observable<Mother32[]>;
  numMother32s$: Observable<number>;
  scale$: Observable<number>;
  unpairedConnection$: Observable<Connection | null>;
  patching$: Observable<boolean>;

  constructor(private mother32State: Mother32StateService,
              private editorState: EditorStateService,
              private cableState: CableStateService,
              private file: FileService) {

    this.name$ = this.editorState.name$;
    this.notes$ = this.editorState.notes$;
    this.mother32s$ = this.mother32State.mother32s$;
    this.numMother32s$ = this.mother32State.numMother32s$;
    this.scale$ = this.editorState.scale$;
    this.unpairedConnection$ = this.cableState.unpairedConnection$;
    this.patching$ = this.unpairedConnection$.map((connection) => connection !== null);
  }

  ngOnInit() {
    this.initPatch();
  }

  setScale(event: Event) {
    this.editorState.setScale((event.target as any).value);
  }

  setName(event: Event) {
    this.editorState.setName((event.target as any).value);
  }

  setNotes(event: Event) {
    this.editorState.setNotes((event.target as any).value);
  }

  initPatch() {
    this.editorState.init();
    this.mother32State.init();
  }

  openPatch() {
    this.file.openPatch();
  }

  savePatchAs() {
    this.file.savePatchAs();
  }

  addMother32() {
    this.mother32State.addNew();
  }

  removeMother32() {
    this.mother32State.removeExisting();
  }

}
