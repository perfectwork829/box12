# Box12

## Generating

#### Modals:
````
ng g m /pages/academy --routing=true
````
#### Components:
````
ng g c /shared/components/modals/check-out
````


## Fixing Dependency
````
- Liberary: @ngx-translate
- Navigate to -> node_modules/@ngx-translate/core/dist/lib/translate.directive.d.ts
- Replace line 25 with this code: static ɵdir: i0.ɵɵDirectiveDeclaration<TranslateDirective, "[translate],[ngx-translate]", never, { 'translate': 'translate'; 'translateParams': 'translateParams'; }, {}, never, never, false, never>;
````


## API

#### Free Trial:
````
- Method: POST
- Body: {phone: string; email: string; branch: number, date: string }
````
