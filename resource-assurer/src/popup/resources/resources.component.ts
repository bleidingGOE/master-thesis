import { Component, OnInit, OnDestroy } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Resource } from 'src/lib/storage/resource';
import { StorageHelper } from 'src/lib/storage/storage-helper';
import { ResourceStateType } from 'src/lib/storage/resource-state.type';
import { ResourceStatusType } from 'src/lib/storage/resource-status.type';

@Component({
  selector: 'popup-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {

  readonly faCoffee = faCoffee;

  private _resources: Resource[] = [];
  private readonly storage: StorageHelper;

  constructor() {
    this.storage = new StorageHelper();
    this.getCurrentTab().then(tab =>
      console.log('[Current TAB]', tab)
    );
  }

  get resources(): Resource[] {
    return this._resources;
  }

  ngOnInit(): void {
    this.initResources();
    browser.storage.onChanged.addListener(this.storageListener);
  }

  ngOnDestroy(): void {
    browser.storage.onChanged.removeListener(this.storageListener);
    this.deleteResources();
  }

  public resolveTagColor(value: ResourceStateType | ResourceStatusType): string {
    switch (value) {
      case ResourceStateType.PUBLISHED:
        return 'is-dark';
      case ResourceStateType.REPORTED:
        return 'is-primary';
      case ResourceStateType.UNPUBLISHED:
        return 'is-warning'

      case ResourceStatusType.RELIABLE:
        return 'is-success';
      case ResourceStatusType.WARNING:
        return 'is-warning';
      case ResourceStatusType.DANGEROUS:
        return 'is-danger';

      default:
        return 'is-light';
    }
  }

  public retrieveFileName(uri: string): string {
    const regex = /\/([^\/]*\.js)/gm;
    const subs = uri.match(regex);

    if (!subs || subs.length === 0) {
      return uri;
    }
    return subs[subs.length - 1];
  }

  private initResources(): void {
    this.getCurrentTab().then(tab =>
      this.storage.getResources(tab)
        .then(resources => this._resources = resources)
    );
  }

  private storageListener = (changes, storageName) => {
    this.getCurrentTab().then(tab => {
      if (storageName === StorageHelper.resourceAlias(tab))
        this._resources = changes.resources.newValue as Resource[];
    });
  }

  private deleteResources() {
    this.getCurrentTab()
      .then(tab => this.storage.deleteResources(tab));
  }

  private getCurrentTab(): Promise<number> {
    return browser.tabs.query({ active: true, currentWindow: true })
      .then(tab => tab[0].id);
  }
}
