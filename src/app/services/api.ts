import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import { UserService } from './user';

/*
RESPONCE  CODES
200  SUCCESS
400	 Invalid JSON
403	 INVALID TOKEN /Email is already in use
*/

/** A file. */
export interface File {
  id: number;
  name: string;
  mime: string;
  size: number;
}

/** A folder. */
export interface Folder {
  id: number;
  path: string;
  created: Date;
  modified: Date;
}

function convertFolder(data: any): Folder {
  return {
    id: data.id,
    path: data.path,
    created: new Date(data.created),
    modified: new Date(data.modified),
  };
}

@Injectable()
export class APIService {
  // private URL = 'http://172.17.0.2:80';
  private URL = 'http://52.2.133.118:80';

  private timeOut = 10000;
  private headerTemplate: Headers;

  constructor(private http: Http, private user: UserService) {
    console.log('Postservice initialized...')
  }


  /** Submits non-GET requests (which *do* have a JSON body). */
  private makeRequest(method: RequestMethod, path: string, body: string, authorization: boolean): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Access-Control-Allow-Origin', '*');

    // authentication not null
    if (authorization) {
      headers.append('authorization', `Bearer ${this.user.getToken()}`);
    }

    //Data
    let options = new RequestOptions({
      'url': this.URL + path,
      'body': body,  // accepts body as a json string
      'method': method,
      'headers': headers
    });

    return this.http.request(new Request(options))
      .timeout(this.timeOut)
      .map((res) => res.json())
      .catch((error: any) => {
        if ('json' in error) {
          if (error.status == 400) {
            return Observable.throw('Invalid request.');
          } else {
            return Observable.throw(error.json().error || 'Internal server error.');
          }
        } else {
          return Observable.throw('Could not establish a connection to the server.');
        }
      });
  }

  // *************************   API CALLS ***********************************
  // *************************   USER ACCOUNT ********************************

  // Creates a new user and returns a jws
  // var body = {"email": "userEmail","password": "userPassword"};
  userAdd(email: string, password: string) {
    var body = JSON.stringify({ 'email': email, 'password': password });
    return this.makeRequest(RequestMethod.Post, '/accounts', body, false);
  }

  // INPUT: User Name & Password
  // OUTPUT:  returns a id_token
  userLogin(email: string, password: string) {
    var body = JSON.stringify({ 'email': email, 'password': password });
    return this.makeRequest(RequestMethod.Post, '/accounts/login', body, false);
  }
  // *************************   FOLDERS   ********************************

  // INPUT: folder id
  // OUTPUT: folder data
  getFolder(id: number): Observable<File[]> {
    return this.makeRequest(RequestMethod.Get, `/folders/${id}`, null, true).map(data => data.files);
  }

  // INPUT: folder path
  // OUTPUT: folder id
  postFolder(path: string) {
    var body = JSON.stringify({ 'path': path });
    return this.makeRequest(RequestMethod.Post, '/folders', body, true);
  }

  // *************************  Multiple   FOLDERS   **************************
  //  INPUT: id_token  OUTPUT: JSON of all folders
  //  OUTPUT: Array of all folders
  getALLFolders(): Observable<Folder[]> {
    return this.makeRequest(RequestMethod.Get, '/folders', null, true).map(data => {
      return data.folders.map(convertFolder);
    });
  }

  // *************************  Single  FILES   ********************************

  // INPUT: file id
  // OUTPUT: file id : number, folder_id: number, name: string, mime: string
  getFileByID(id: number) {
    return this.makeRequest(RequestMethod.Get, `/files/${id}`, null, true);
  }
  // INPUT: folder id and file name
  // OUTPUT: file id
  postFile(folder_id: number, fileName: string) {
    var body = JSON.stringify({ 'folder_id': folder_id, name: fileName });
    return this.makeRequest(RequestMethod.Post, '/files', body, true);
  }


  // *************************  RESTORE FILES   ********************************
  getFileDownload(id: number) {
    return this.makeRequest(RequestMethod.Get, `/files/${id}/download`, null, true);
  }
}
