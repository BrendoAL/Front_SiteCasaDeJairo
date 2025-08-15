import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { platformServer, renderModule } from '@angular/platform-server';
import { AppServerModule } from './app.server.module';

enableProdMode();

export default function render(url: string) {
  return renderModule(AppServerModule, {
    document: '<app-root></app-root>', // seu index.html minimal
    url
  });
}
