import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private imageCache = new Map<string, string>();
  private loadingImages = new Set<string>();
  
  constructor(private http: HttpClient) {}

  loadImage(url: string, fallbackUrl: string = 'assets/imagens/placeholder.jpg'): Observable<string> {
    if (this.imageCache.has(url)) {
      return of(this.imageCache.get(url)!);
    }

    if (this.loadingImages.has(url)) {
      return new Observable(observer => {
        const checkCache = () => {
          if (this.imageCache.has(url)) {
            observer.next(this.imageCache.get(url)!);
            observer.complete();
          } else {
            setTimeout(checkCache, 100);
          }
        };
        checkCache();
      });
    }

    this.loadingImages.add(url);

    return new Observable(observer => {
      const img = new Image();
      
      img.onload = () => {
        this.imageCache.set(url, url);
        this.loadingImages.delete(url);
        observer.next(url);
        observer.complete();
      };
      
      img.onerror = () => {
        console.warn(`Falha ao carregar imagem: ${url}`);
        this.imageCache.set(url, fallbackUrl);
        this.loadingImages.delete(url);
        observer.next(fallbackUrl);
        observer.complete();
      };
    });
}
}
