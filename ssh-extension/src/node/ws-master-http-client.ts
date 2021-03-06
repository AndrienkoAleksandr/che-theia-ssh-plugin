/*
 * Copyright (c) 2018 Red Hat, Inc.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

import { AxiosInstance, AxiosPromise, AxiosRequestConfig, default as axios } from 'axios'
import { inject, injectable } from 'inversify';
import { EnvVars } from './env-vars';

/**
 * Plain wrapper around {@link AxiosInstance} class that is configured to
 * have workspace API endpoint location as base URL. The value of API endpoint
 * location is fetched out of environment variable called 'CHE_API'. If there
 * is no such variable set the client tries to continue with default property
 * values, however no correct request addressing is guaranteed in this case.
 *
 */
@injectable()
export class WsMasterHttpClient {

    private readonly ISSUE = "Can't properly configure workspace master http client";
    private readonly REASON = "CHE_API environment property is undefined";

    private readonly axiosInstance: AxiosInstance;

    constructor(@inject(EnvVars) protected readonly envVars: EnvVars) {
        const cheApi = envVars.cheApi;

        if (cheApi) {
            this.axiosInstance = axios.create({ baseURL: cheApi });
        } else {
            throw new Error(`Issue: ${this.ISSUE}, Reason: ${this.REASON}`);
        }
    }

    /**
     * @see AxiosInstance.request
     */
    request<T>(config: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.request<T>(config);
    }

    /**
     * @see AxiosInstance.get
     */
    get<T>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.get<T>(url, config);
    }

    /**
     * @see AxiosInstance.delete
     */
    delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axiosInstance.delete(url, config);
    }

    /**
     * @see AxiosInstance.head
     */
    head(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this.axiosInstance.head(url, config);
    }

    /**
     * @see AxiosInstance.post
     */
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.post<T>(url, data, config);
    }

    /**
     * @see AxiosInstance.put
     */
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.put<T>(url, data, config);
    }

    /**
     * @see AxiosInstance.patch
     */
    patch<T>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T> {
        return this.axiosInstance.patch<T>(url, data, config);
    }

}
