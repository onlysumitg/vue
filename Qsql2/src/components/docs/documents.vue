<template>
  <table class="table table-striped">
    <thead>
    <tr>
      <th class="stickyHead" scope="col">Option</th>
      <th class="stickyHead" scope="col">Text</th>
      <th  class="stickyHead" scope="col">Example</th>

    </tr>
    </thead>
    <tbody>
    <tr>
      <th scope="row">@s</th>
      <td>Select with option to edit</td>
      <td>
        <p>@s tableName</p>
        <p>@s tableName where col1 = 'abc' ...</p>
      </td>

    </tr>
    <tr>
      <th scope="row">@s with @only</th>
      <td>Select limited columns with option to edit</td>
      <td>
        <p>@s tableName @only col1, col2</p>
        <p>@s tableName where col1 = 'abc' order by col2 @only col3</p>
      </td>

    </tr>

    <tr>
      <th scope="row">@b</th>
      <td>Go to bottom</td>
      <td>
        <p>@s tableName</p>
        <p>@s tableName where col1 = 'abc' ...</p>
      </td>

    </tr>

    <tr>
      <th scope="row">@d</th>
      <td>Download as excel</td>
      <td>
        <p>@d select * from table1 ...</p>

      </td>

    </tr>

    <tr>
      <th scope="row">@connect</th>
      <td>Connect to a different server to run the sql</td>
      <td>
        <p>@connect serverName>> ANY_SQL_QUERY</p>

      </td>

    </tr>
    <tr>
      <th scope="row">@multi</th>
      <td>Run multiple queries in one go</td>
      <td>
        <p>@multi  ANY_SQL_QUERY  &&  SQL2 && SQL3</p>

      </td>
    </tr>
    <tr>
      <th scope="row">@copy</th>
      <td>Copy data from one table to other.</td>
      <td>
        <p>@copy @from select * from abc @to  xyz</p>

      </td>

    </tr>

    <tr>
      <th scope="row">@copy with @connect</th>
      <td>Copy data from one table to other table on different servers.</td>
      <td>
        <p>@copy @from @connect server2>> select * from abc @to  xyz</p>
        <p>@copy @from select * from abc @to @connect server2>>  xyz</p>
      </td>

    </tr>

    <tr>
      <th scope="row">@table</th>
      <td>Table catalog details</td>
      <td>
        <p>@table tablename</p>
        <p>@table lib/tablename</p>
      </td>

    </tr>

    <tr>
      <th scope="row">@sp</th>
      <td>Stored procedure catalog details</td>
      <td>
        <p>@sp spname</p>
        <p>@sp lib/spname</p>
      </td>

    </tr>

    <tr>
      <th scope="row">@heading with @run</th>
      <td>Define the tab heading for the result</td>
      <td>
        <p>@heading My New Heading @run  AnySQL</p>

      </td>

    </tr>
    </tbody>
  </table>
</template>


